import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderRunList from 'src/components/order/OrderRunList';

const OrderList = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <OrderRunList />
      </Container>
    </Box>
  </>
);

export default OrderList;
