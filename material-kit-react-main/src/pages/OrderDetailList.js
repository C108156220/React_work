import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderDetailRunList from 'src/components/order/OrderDetailRunList';

const OrderDetailList = () => (
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
        <OrderDetailRunList />
      </Container>
    </Box>
  </>
);

export default OrderDetailList;
