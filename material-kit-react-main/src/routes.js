import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import AddCustomer from 'src/pages/AddCustomer';
import OrderList from 'src/pages/OrderList';
import OrderDetailList from 'src/pages/OrderDetailList';
import AddOrder from 'src/pages/AddOrder';
import AddOrderDetail from 'src/pages/AddOrderDetail';
import UpdateCustomer from 'src/pages/UpdateCustomer';
import UpdateDetail from 'src/pages/UpdateDetail';
import UpdateOrder from 'src/pages/UpdateOrder';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'order', element: <OrderList /> },
      { path: 'orderdetail', element: <OrderDetailList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'addcustomer', element: <AddCustomer /> },
      { path: 'addorder', element: <AddOrder /> },
      { path: 'addorderdetail', element: <AddOrderDetail /> },
      { path: 'updatecustomer', element: <UpdateCustomer /> },
      { path: 'updateorder', element: <UpdateOrder /> },
      { path: 'updatedetail', element: <UpdateDetail /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
