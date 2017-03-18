import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

import './global.scss';

window.onload = () => {
  const root = document.getElementById('root');
  ReactDOM.render(React.createElement(Main), root);
};
