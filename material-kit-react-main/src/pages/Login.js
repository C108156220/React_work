import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Actions from 'src/Actions';
import React from 'react';
// import { SendContext } from 'src/Context';
// import AccountProfile from 'src/components/account/AccountProfile';

var userLogin; // eslint-disable-line
const Login = () => {
  const navigate = useNavigate();
  const data = Actions();

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
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
          <Formik
            initialValues={{
              number: '0',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              number: Yup.number().typeError('number only').max(9999).required('Employee_Id is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              const userlist = data.users;
              let usercheck = false;
              for (let i = 0; i < userlist.length; i++) {
                if ((values.number === userlist[i].id) && (values.password === userlist[i].phone)) {
                  usercheck = '1';
                  userLogin = userlist[i];
                } else if ((values.number === userlist[i].id) && (values.password !== userlist[i].phone)) {
                  usercheck = '0';
                }
              }
              if (usercheck === '1') {
                navigate('/app/dashboard', { replace: true });
                console.log('Success!');
                console.log(userLogin);
              } else if (usercheck === '0') {
                console.log('Password Error!');
              } else {
                console.log('no user!');
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              // isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with Your ID
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.number && errors.number)}
                  fullWidth
                  helperText={touched.number && errors.number}
                  label="Employee ID"
                  margin="normal"
                  name="number"
                  placeholder="000"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="phone"
                  value={values.number}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export { userLogin };
export default Login;
