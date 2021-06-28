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
import { userLogin } from 'src/pages/Login';

const AddOrder = () => {
  const navigate = useNavigate();
  const getUser = userLogin;
  const insertUser = (newUser) => {
    fetch('http://localhost/php-react/add-order.php', {
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
    navigate('/app/order', { replace: true });
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
                    新增訂單
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                    align="center"
                  >
                    輸入訂單的編號、員工代號、客戶代號、訂單日期及備註以新增產品
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
                    onChange={(e) => addNewUser(e, 'ID')}
                    variant="outlined"
                  />
                  <TextField
                    label="員工代號"
                    margin="normal"
                    name="eID"
                    type="text"
                    placeholder={getUser.id}
                    onChange={(e) => addNewUser(e, 'eID')}
                    style={{ marginLeft: '15px' }}
                    variant="outlined"
                  />
                  <TextField
                    label="客戶代號"
                    margin="normal"
                    name="cID"
                    type="text"
                    onChange={(e) => addNewUser(e, 'cID')}
                    variant="outlined"
                  />
                  <TextField
                    label="訂單日期"
                    margin="normal"
                    name="date"
                    type="text"
                    style={{ marginLeft: '15px' }}
                    onChange={(e) => addNewUser(e, 'orderdate')}
                    variant="outlined"
                  />
                  <TextField
                    label="備註"
                    margin="normal"
                    name="descript"
                    type="text"
                    style={{ marginLeft: '15px' }}
                    onChange={(e) => addNewUser(e, 'descript')}
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

export default AddOrder;
