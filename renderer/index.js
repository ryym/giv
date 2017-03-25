import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import history from './history';
import configureStore from './store';
import { loadUserConfig, push } from './actions';
import * as paths from './const/paths';

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

const unsubscribe = store.subscribe(() => {
  const { userConfig } = store.getReader();

  if (!userConfig.isLoaded) {
    return;
  }

  if (userConfig.accessToken && history.location.pathname !== paths.notifications) {
    store.dispatch(push(paths.notifications));
  }

  if (document.readyState === 'pending') {
    document.addEventListener('DOMContentLoaded', renderView);
  }
  else {
    renderView();
  }

  unsubscribe();
});
