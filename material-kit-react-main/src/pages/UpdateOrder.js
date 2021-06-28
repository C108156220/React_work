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
import { order } from 'src/components/order/OrderRunList';
  
const  UpdateOrder = () => {
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  const customers = order;
  const customer = order;
  const updateProduct = (productData) => {
    fetch('http://localhost/php-react/update-order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((res) => {
          console.log(JSON.stringify(productData));
          return res.json();
        })
      .then((data) => {
            product.prod_seq = productData.prod_seq;
            product.prod_eid = productData.prod_eid; // eslint-disable-line no-param-reassign
            product.prod_cid = productData.prod_cid; // eslint-disable-line no-param-reassign
            product.prod_orderdate = productData.prod_orderdate;
            product.prod_note = productData.prod_note;
            console.log('pn&cn');
            setNewData(product);
            navigate('/app/order', { replace: true });
            alert(data.msg);
            return product;
        })
      .catch((err) => {
        navigate('/app/order', { replace: true });
        console.log(err);
      });
  };
  
  const saveBtn = () => {
    updateProduct(newData);
    console.log(customer.id);
  };

  const updateNewData = (e, field) => {
    setNewData({
        ...newData,
        prod_id: customer.ID,
        prod_seq: customer.id,
        [field]: e.target.value,
      });
    
  };
  const cancelEdit = (id) => {
      if (customer.ID === id) {
        customer.isEditing = false; // eslint-disable-line no-param-reassign
        navigate('/app/order', { replace: true });
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
        <div>Order Detail list</div>
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>
                      序號 (seq))
                    </TableCell>
                    <TableCell>
                      訂單編號 (ID)
                    </TableCell>
                    <TableCell>
                    員工代號 (employee)
                    </TableCell>
                    <TableCell>
                    客戶代號 (Customer)
                    </TableCell>
                    <TableCell>
                    訂單日期 (Date)	
                    </TableCell>
                    <TableCell>
                    備註 (Descript)
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
                        {customer.id}
                        </TableCell>
                        <TableCell
                            type='text'
                            variant='outlined'
                        >
                        {customer.ID}
                        </TableCell>
                        <TableCell>
                          <TextField
                              label='員工代號'
                              margin='normal'
                              name='name'
                              type='text'
                              onChange={(e) => updateNewData(e, 'prod_eid')}
                              variant='outlined'
                              defaultValue={customer.eID}
                          >
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                              label='客戶代號'
                              margin='normal'
                              name='price'
                              type='text'
                              onChange={(e) => updateNewData(e, 'prod_cid')}
                              variant='outlined'
                              defaultValue={customer.cID}
                            >
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                              label='訂單日期'
                              margin='normal'
                              name='cost'
                              type='text'
                              onChange={(e) => updateNewData(e, 'prod_orderdate')}
                              defaultValue={customer.orderdate}>
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                              label='備註'
                              margin='normal'
                              name='cost'
                              type='text'
                              onChange={(e) => updateNewData(e, 'prod_note')}
                              defaultValue={customer.note}>
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
export default UpdateOrder;
