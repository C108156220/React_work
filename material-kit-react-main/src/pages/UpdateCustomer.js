/* eslint-disable */
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
  } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { updateprod } from 'src/components/customer/CustomerRunList';
  
const  UpdateCustomer = () => {
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  const customers = updateprod;
  const customer = updateprod;
  const updateProduct = (productData) => {
    fetch('http://localhost/php-react/update-prod.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((res) => {
            console.log(productData.prod_price);
          return res.json();
        })
      .then((data) => {
            product.prod_name = productData.prod_name; // eslint-disable-line no-param-reassign
            product.prod_price = customer.price; // eslint-disable-line no-param-reassign
            product.prod_cost = customer.cost;
            console.log('pn&cn');
            setNewData(product);
            navigate('/app/customers', { replace: true });
            alert(data.msg);
            return product;
        })
      .catch((err) => {
        navigate('/app/customers', { replace: true });
        console.log(err);
      });
  };
  
  const saveBtn = () => {
    updateProduct(newData);
    console.log(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
        ...newData,
        prod_id: customer.ID,
        [field]: e.target.value,
      });
    
  };
  const cancelEdit = (id) => {
      if (customer.ID === id) {
        customer.isEditing = false; // eslint-disable-line no-param-reassign
        navigate('/app/customers', { replace: true });
        return customer;
      }
      return customer;
    setProducts(customers);
  };
  const handleAdd = () => {
    navigate('/app/addcustomer', { replace: true });
  };
  return (
    <>
    <Helmet>
      <title>Update | Material Kit</title>
    </Helmet>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            color='primary'
            variant='contained'
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
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon
                          fontSize='small'
                          color='action'
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder='Search product by ID'
                  variant='outlined'
                />
                {/* <Button
                  color='primary'
                  style={{ width: '120px', marginLeft: '10px' }}
                  onClick={() => { alert('A'); }}
                  size='large'
                  type='submit'
                  variant='contained'
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
                    <TableRow>
                        <TableCell
                            type='text'
                            variant='outlined'
                        >
                        {customer.ID}
                        </TableCell>
                        <TableCell>
                          <TextField
                              label='產品名稱'
                              margin='normal'
                              name='name'
                              type='text'
                              onChange={(e) => updateNewData(e, 'prod_name')}
                              variant='outlined'
                              defaultValue={customer.name}
                          >
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                              label='產品價格'
                              margin='normal'
                              name='price'
                              type='text'
                              onChange={(e) => updateNewData(e, 'prod_price')}
                              variant='outlined'
                              defaultValue={customer.price}
                            >
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                              label='產品成本'
                              margin='normal'
                              name='cost'
                              type='text'
                              onChange={(e) => updateNewData(e, 'prod_cost')}
                              defaultValue={customer.cost}>
                          </TextField>
                        </TableCell>
                        <TableCell>
                            <Button
                                color='primary'
                                variant='contained'
                                onClick={() => saveBtn()}
                            >
                            儲存
                            </Button>
                            <Button
                                color='secondary'
                                variant='contained'
                                onClick={() => cancelEdit(customer.ID)}
                            >
                            取消
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
      </Box>
    </>
  );
};
export default UpdateCustomer;
