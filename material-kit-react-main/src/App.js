import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

function App() {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      {routing}
    </ThemeProvider>
  );
}

export default App;
