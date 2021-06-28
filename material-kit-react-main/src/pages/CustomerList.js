import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// import CustomerListResults from 'src/components/customer/CustomerListResults';
// import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import CustomerRunList from 'src/components/customer/CustomerRunList';

const CustomerList = () => (
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
        <CustomerRunList />
        {/* <Box sx={{ pt: 3 }}>
          <div>products</div>
          <CustomerListResults />
        </Box> */}
      </Container>
    </Box>
  </>
);

export default CustomerList;
