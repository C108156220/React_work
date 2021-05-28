import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
//import {Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange, green } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  root: {
    background:"linear-gradient(45deg, #333, #999)",
    border:0,
    borderRadius:15,
    color:"white",
    padding:"5px 30px",
    marginBottom:10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    width:"100%",
  },
}));

const theme=createMuiTheme({
  typography: {
    h4: {
      fontsize: 30,
      marginBottom: 10,
    }
  },
  palette: {
    primary: {
      main: green[400],
    },
    secondary:{
      main: orange[400],
    }
  }
});

function ButtonStyled() {
  const classes=useStyles();

  return(
    <form className={classes.root} noValidate autoComplete="off">
      <Button variant="contained" color="primary">
        自帶樣式的按鈕
      </Button>
    </form>
  );
}

function Checkbox_example() {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return(
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
          />
      }
    />
  )
}

function InputWithIcon() {
  return(
    <TextField
      id="input-icon"
      label="Standard_numberOnly"
      type="number"
      placeholder="123456"
      color="secondary"
      InputProps={{
        startAdornment:(
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
  );
}

function CustomCheckbox() {
  return(
    <Checkbox color="primary">CustomStyles</Checkbox>
  );
}

function CustomStyles() {
  return(
    <ThemeProvider theme={theme}>
      <CustomCheckbox />
    </ThemeProvider>
  );
}

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.title}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            <Menu_example />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function Menu_example() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <div>
      <Button aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Option 1</MenuItem>
        <MenuItem onClick={handleClose}>Option 2</MenuItem>
        <MenuItem onClick={handleClose}>Option 3</MenuItem>
      </Menu>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonAppBar />
        <img src={logo} className="App-logo" alt="logo" />
        
        <Typography variant="h3">h3</Typography>
        <InputWithIcon />
        <Checkbox_example />
        <ButtonStyled />
        <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} endIcon={<SaveIcon />}>
        Save
        </Button>
        <CustomStyles />
      </header>
    </div>
  );
}

export default App;
