import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import createHashHistory from 'history/createHashHistory';
import store from './store';

import './global.scss';

const history = createHashHistory();

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root history={history} />
    </Provider>,
    document.getElementById('root')
  );
};
