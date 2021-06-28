import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { selectedDetail } from 'src/components/order/OrderRunList';

const AddOrderDetail = () => {
  const navigate = useNavigate();
  const insertUser = (newUser) => {
    fetch('http://localhost/php-react/add-orderdetail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => { // eslint-disable-line
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setUsers([ // eslint-disable-line
            {
              id: data.id,
              ...newUser,
            },
            ...users, // eslint-disable-line
          ]);
          setUserLength(true); // eslint-disable-line
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [newUser, setNewUser] = useState({});

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitUser = (e) => {
    e.preventDefault();
    insertUser(newUser);
    e.target.reset();
    navigate('/app/orderdetail', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik>
            {() => (
              <form onSubmit={submitUser}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    align="center"
                  >
                    新增訂單明細
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                    align="center"
                  >
                    輸入產品代號、數量、折扣以新增產品
                  </Typography>
                </Box>
                <Box
                  sx={{ mb: 3 }}
                  align="center"
                >
                  <TextField
                    label="訂單編號"
                    margin="normal"
                    name="ID"
                    type="text"
                    placeholder={selectedDetail}
                    onChange={(e) => addNewUser(e, 'ID')}
                    variant="outlined"
                  />
                  <TextField
                    label="產品代號"
                    margin="normal"
                    name="pID"
                    type="text"
                    onChange={(e) => addNewUser(e, 'pID')}
                    style={{ marginLeft: '15px' }}
                    variant="outlined"
                  />
                  <TextField
                    label="數量"
                    margin="normal"
                    name="qty"
                    type="text"
                    onChange={(e) => addNewUser(e, 'qty')}
                    variant="outlined"
                  />
                  <TextField
                    label="折扣"
                    margin="normal"
                    name="discount"
                    type="text"
                    style={{ marginLeft: '15px' }}
                    onChange={(e) => addNewUser(e, 'discount')}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    align="center"
                  >
                    Insert Order
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default AddOrderDetail;
