import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import history from './history';
import configureStore from './store';
import { loadUserConfig } from './actions';

import './global.scss';

const renderView = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root history={history} />
    </Provider>,
    document.getElementById('root')
  );
};

const store = configureStore();

store.dispatch(loadUserConfig());

store.subscribe(() => {
  if (!store.getReader().userConfig.isLoaded) {
    return;
  }

  if (document.readyState === 'pending') {
    document.addEventListener('DOMContentLoaded', renderView);
  }
  else {
    renderView();
  }
});
