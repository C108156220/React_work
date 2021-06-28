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

const AddCustomer = () => {
  const navigate = useNavigate();
  const insertUser = (newUser) => {
    fetch('http://localhost/php-react/add-prod.php', {
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
    navigate('/app/customers', { replace: true });
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
                    新增產品
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                    align="center"
                  >
                    輸入產品的名稱、代號、價錢、成本以新增產品
                  </Typography>
                </Box>
                <Box
                  sx={{ mb: 3 }}
                  align="center"
                >
                  <TextField
                    label="產品名稱"
                    margin="normal"
                    name="Name"
                    type="text"
                    onChange={(e) => addNewUser(e, 'prod_name')}
                    variant="outlined"
                  />
                  <TextField
                    label="產品ID"
                    margin="normal"
                    name="id"
                    type="text"
                    style={{ marginLeft: '15px' }}
                    onChange={(e) => addNewUser(e, 'prod_id')}
                    variant="outlined"
                  />
                  <TextField
                    label="單價"
                    margin="normal"
                    name="price"
                    type="text"
                    onChange={(e) => addNewUser(e, 'prod_price')}
                    variant="outlined"
                  />
                  <TextField
                    label="成本"
                    margin="normal"
                    name="cost"
                    type="text"
                    style={{ marginLeft: '15px' }}
                    onChange={(e) => addNewUser(e, 'prod_cost')}
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
                    Insert product
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

export default AddCustomer;
