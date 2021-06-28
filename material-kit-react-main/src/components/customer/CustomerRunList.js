import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useData from 'src/__mocks__/customers';
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
import { CSVLink } from 'react-csv'; // eslint-disable-line

var selectedData=[]; // eslint-disable-line
var updateprod; // eslint-disable-line
const CustomerRunList = (props) => {
  const [customers] = useData();
  const [newData, setNewData] = useState({}); // eslint-disable-line
  const [products, setProducts] = useState([]); // eslint-disable-line
  const [productLength, setProductLength] = useState(null); // eslint-disable-line
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const passSelectData = (data) => { // eslint-disable-line
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < customers.length; j++) {
        if (customers[j].id === data[i]) {
          selectedData.push(customers[j]); // eslint-disable-line
          console.log('access');
        } else { console.log('can\'t find data'); }
      }
    }
    console.log(selectedData);
  };
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    selectedData = [];

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
    selectedData = [];

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
      if (customer.ID === id) {
        console.log(customer.isEditing);
        customer.isEditing = true;
        console.log(customer.isEditing);// eslint-disable-line no-param-reassign
        updateprod = customer;
        console.log(updateprod)
        navigate('/app/UpdateCustomer', { replace: true });
        return customer;
      }
      customer.isEditing = false; // eslint-disable-line no-param-reassign
      return customer;
    });
    setProducts(customers);
  };
  const enableEdit = (id, prod_name, prod_price, prod_cost) => {
    setNewData({ id, prod_name, prod_price, prod_cost });
    console.log(id);
    editMode(id);
  };
  /* eslint-enable */
  const deleteProd = (theID) => {
    fetch('http://localhost/php-react/delete-product.php', {
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
          navigate('/app/customers', { replace: true });
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
    navigate('/app/addcustomer', { replace: true });
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
              data={selectedData}
              filename="Product_data.csv"
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
            Add product
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
                  placeholder="Search product by ID"
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
        <div>products list</div>
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
                      產品代號 (ID)
                    </TableCell>
                    <TableCell>
                      產品名稱 (Name)
                    </TableCell>
                    <TableCell>
                      單價 (UnitPrice)
                    </TableCell>
                    <TableCell>
                      成本 (Cost)
                    </TableCell>
                    <TableCell>
                      變動 (Update/Delete)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.slice(0, limit).map((customer) => { // eslint-disable-line
                    if (value !== '') {
                      if (customer.ID === value) {
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
                              {customer.name}
                            </TableCell>
                            <TableCell>
                              {customer.price}
                            </TableCell>
                            <TableCell>
                              {customer.cost}
                            </TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={() => enableEdit(customer.ID, customer.name, customer.price, customer.cost)}
                              >
                                更新
                              </Button>
                              <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => deleteData(customer.ID)}
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
                            {customer.name}
                          </TableCell>
                          <TableCell>
                            {customer.price}
                          </TableCell>
                          <TableCell>
                            {customer.cost}
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => enableEdit(customer.ID, customer.name, customer.price, customer.cost)}
                            >
                              更新
                            </Button>
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => deleteData(customer.ID)}
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
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Box>
    </>
  );
};
// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired // eslint-disable-line
// };

export { updateprod };
export default CustomerRunList;
