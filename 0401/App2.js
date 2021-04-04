import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const Car = () =>(
    <div>
      <h2>I am a Car!</h2>
      <h3>(App2.js, Arrow function)</h3>
    </div>
);

const App = () => (
    <div>
    <h1>Who lives in my Garage?</h1>
    <Car />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
