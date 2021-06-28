import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { userLogin } from 'src/pages/Login';

const AccountProfile = (props) => {
  const getUser = userLogin;
  console.log(getUser);
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    id: '員工代號： ' + getUser.id, // eslint-disable-line
    name: getUser.user_name,
    dept_name: getUser.dept_name,
    job: getUser.user_job,
    time: '登入時間：'
    // city: 'Los Angeles',
    // country: 'USA',
    // jobTitle: 'Senior Developer',
    // name: 'Katarina Smith',
    // timezone: 'GTM-7'
  };

  // const AccountProfile = (props) => (
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.id}
            {/* {`${user.city} ${user.country}`} */}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.dept_name} ${user.job}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.time} ${moment().format('hh:mm A')}`}
            {/* {`${moment().format('hh:mm A')} ${user.timezone}`} */}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
