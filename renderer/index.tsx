import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import history from './history';
import configureStore from './store';
import { isConfigLoaded, getAccessToken } from './state/selectors'
import { LoadUserConfig, Push } from './actions';
import * as paths from './const/paths';

import './common.scss';

const renderView = () => {
  render(
    <Provider store={store}>
      <Root history={history} />
    </Provider>,
    document.getElementById('root')
  );
};

const store = configureStore();

store.dispatch(LoadUserConfig());

const unsubscribe = store.subscribe(() => {
  const state = store.getState()
  if (!isConfigLoaded(state)) {
      return
  }

  if (!getAccessToken(state) && history.location.pathname !== paths.tokenRegistration) {
    store.dispatch(Push(paths.tokenRegistration));
  }

  if (document.readyState === 'pending') {
    document.addEventListener('DOMContentLoaded', renderView);
  }
  else {
    renderView();
  }

  unsubscribe();
});
