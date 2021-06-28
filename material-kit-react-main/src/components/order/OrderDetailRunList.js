import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useData from 'src/__mocks__/orderdetail';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { selectedDetail } from './OrderRunList';
import { CSVLink } from 'react-csv'; // eslint-disable-line

var selectedOrderdetail=[]; // eslint-disable-line
var updatedetail; // eslint-disable-line
const OrderRunList = (props) => {
  const [newData, setNewData] = useState({}); // eslint-disable-line
  const [saveData] = useData();
  const customers = [];
  for (let i = 0; i < saveData.length; i++) {
    if (saveData[i].ID === selectedDetail) {
      customers.push(saveData[i]);
    }
  }
  console.log(customers);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const passSelectData = (data) => { // eslint-disable-line
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < customers.length; j++) {
        if (customers[j].id === data[i]) {
          selectedOrderdetail.push(customers[j]); // eslint-disable-line
          console.log('access');
        } else { console.log('can\'t find data'); }
      }
    }
    console.log(selectedOrderdetail);
  };
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    selectedOrderdetail = [];

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    passSelectData(newSelectedCustomerIds);
  };
  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];
    selectedOrderdetail = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    passSelectData(newSelectedCustomerIds);
  };
  /* eslint-disable */
  const editMode = (id) => {
    customers.slice(0, limit).map((customer) => {
      if (customer.id === id) {
        customer.isEditing = true;
        updatedetail = customer;
        console.log(updatedetail)
        navigate('/app/updatedetail', { replace: true });
        return customer;
      }
      customer.isEditing = false; // eslint-disable-line no-param-reassign
      return customer;
    });
  };
  const enableEdit = (location, id, prod_name, prod_price, prod_cost) => {
    setNewData({ id, prod_name, prod_price, prod_cost });
    console.log(id);
    editMode(location);
  };
  /* eslint-enable */
  const deleteProd = (theID) => {
    fetch('http://localhost/php-react/delete-orderdetail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => (res.json()))
      .then((data) => {
        if (data.success) {
          console.log('deleted');
          navigate('/app/account', { replace: true });
          navigate('/app/orderdetail', { replace: true });
        } else {
          console.log(data);
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteData = (ID) => {
    if (window.confirm('Are you sure?')) {
      deleteProd(ID);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleAdd = () => {
    navigate('/app/addorderdetail', { replace: true });
  };

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            sx={{ mx: 1 }}
            color="primary"
            variant="contained"
          >
            <CSVLink
              data={selectedOrderdetail}
              filename="Order_detail.csv"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Export
            </CSVLink>
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAdd}
          >
            Add Order
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  width: 500,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {console.log(value)}
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Search detail by Product"
                  variant="outlined"
                />
                {/* <Button
                  color="primary"
                  style={{ width: '120px', marginLeft: '10px' }}
                  onClick={() => { alert('A'); }}
                  size="large"
                  type="submit"
                  variant="contained"
                  startIcon={<SearchIcon />}
                >
                  查詢
                </Button> */}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box sx={{ pt: 3 }}>
        <div>Order Detail list</div>
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.length === customers.length}
                        color="primary"
                        indeterminate={
                          selectedCustomerIds.length > 0
                          && selectedCustomerIds.length < customers.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      訂單編號 (ID)
                    </TableCell>
                    <TableCell>
                      產品代號 (Product)
                    </TableCell>
                    <TableCell>
                      數量 (Quantity)
                    </TableCell>
                    <TableCell>
                      折扣 (Discount)
                    </TableCell>
                    <TableCell>
                      變動 (Update/Delete)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.slice(0, limit).map((customer) => { // eslint-disable-line
                    if (value !== '') {
                      if (customer.pID === value) {
                        return (
                          <TableRow
                            hover
                            key={customer.id}
                            selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                                onChange={(event) => handleSelectOne(event, customer.id)}
                                value="true"
                              />
                            </TableCell>
                            <TableCell>
                              {customer.ID}
                            </TableCell>
                            <TableCell>
                              {customer.pID}
                            </TableCell>
                            <TableCell>
                              {customer.qty}
                            </TableCell>
                            <TableCell>
                              {customer.discount}
                            </TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={() => enableEdit(customer.id, customer.ID, customer.name, customer.price, customer.cost)}
                              >
                                更新
                              </Button>
                              <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => deleteData(customer.id)}
                              >
                                刪除
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    } else {
                      return (
                        <TableRow
                          hover
                          key={customer.id}
                          selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                              onChange={(event) => handleSelectOne(event, customer.id)}
                              value="true"
                            />
                          </TableCell>
                          <TableCell>
                            {customer.ID}
                          </TableCell>
                          <TableCell>
                            {customer.pID}
                          </TableCell>
                          <TableCell>
                            {customer.qty}
                          </TableCell>
                          <TableCell>
                            {customer.discount}
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => enableEdit(customer.id, customer.ID, customer.name, customer.price, customer.cost)}
                            >
                              更新
                            </Button>
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => deleteData(customer.id)}
                            >
                              刪除
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={customers.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 15, customers.length]}
          />
        </Card>
      </Box>
    </>
  );
};

export { updatedetail };
export default OrderRunList;
