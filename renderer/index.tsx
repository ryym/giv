import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as config from './const/config';
import App from './components/App';
import createHashHistory from 'history/createHashHistory';
import configureStore from './store';
import { loadUserConfig } from './store/login/actions';

import './common.scss';

const history = createHashHistory();
const store = configureStore({ history });

if (config.NODE_ENV === 'development' && typeof window === 'object') {
  // So that we can inspect the store from the developer console.
  (window as any)._store = store;
}

const renderView = () => {
  render(
    <Provider store={store as any}>
      <App history={history} />
    </Provider>,
    document.getElementById('root'),
  );
};

store.dispatch(loadUserConfig()).then(() => {
  if (document.readyState === 'complete') {
    renderView();
  }
  else {
    document.addEventListener('DOMContentLoaded', renderView);
  }
});
