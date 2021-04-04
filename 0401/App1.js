import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function Car () {
  return (
    <div>
      <h2>I am a Car!</h2>
      <h3>(App1.js, function component)</h3>
    </div>
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
