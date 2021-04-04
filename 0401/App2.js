import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const Car = () =>(
    <h2>I am a Car!</h2>
);

const App = () => (
    <div>
    <h1>Who lives in my Garage?</h1>
    <Car />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
