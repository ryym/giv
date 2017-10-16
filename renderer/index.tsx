import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createHashHistory from 'history/createHashHistory';
import configureStore from './store';
import { loadUserConfig } from './store/user-config/actions';

import './common.scss';

const history = createHashHistory();
const store = configureStore({ history });

const renderView = () => {
  render(
    <Provider store={store as any}>
      <App history={history} />
    </Provider>,
    document.getElementById('root'),
  );
};

store.dispatch(loadUserConfig()).then(() => {
  if (document.readyState === 'pending') {
    document.addEventListener('DOMContentLoaded', renderView);
  }
  else {
    renderView();
  }
});
