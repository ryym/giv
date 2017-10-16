import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import Root from './components/Root';
import App from './components/App';
import { History } from 'history';
import createHashHistory from 'history/createHashHistory';
import configureStore from './store';
import { isConfigLoaded, getAccessToken } from './store/selectors';
import { loadUserConfig } from './store/user-config/actions';
import { push } from './store/router/actions';
import * as paths from './const/paths';

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
  const state = store.getState();
  if (!isConfigLoaded(state)) {
    return;
  }

  if (!getAccessToken(state) && history.location.pathname !== paths.tokenRegistration) {
    store.dispatch(push(paths.tokenRegistration));
  }

  if (document.readyState === 'pending') {
    document.addEventListener('DOMContentLoaded', renderView);
  }
  else {
    renderView();
  }
});
