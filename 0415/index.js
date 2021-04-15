import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './App';

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
