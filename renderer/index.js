import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import history from './history';
import store from './store';
import { loadUserConfig } from './actions';

import './global.scss';

store.dispatch(loadUserConfig());

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root history={history} />
    </Provider>,
    document.getElementById('root')
  );
};
