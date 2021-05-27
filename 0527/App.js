import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
//import {Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';


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


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <TextField id="standard-basic" label="Standard" /> {/* variant="filled" (or "outlined") */}
        <Checkbox_example />
        <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} endIcon={<SaveIcon />}>
        Save
        </Button>
      </header>
    </div>
  );
}

export default App;
