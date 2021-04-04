import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function Car () {
  return (
    <h2>I am a Car!</h2>
  );
}

function App () {
    return (
        <div>
        <h1>Who lives in my Garage?</h1>
        <Car />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
