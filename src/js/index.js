import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const dest = document.getElementById('root');

const render = () => {
  ReactDOM.render(<App />, dest);
};

if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render);
  });
}

render();
