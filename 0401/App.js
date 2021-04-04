import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Car extends React.Component {
  render() {
    return (
      <div>
        <h2>I am a Car!</h2>
        <h3>(App.js, class component)</h3>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
      <h1>Who lives in my Garage?</h1>
      <Car />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
