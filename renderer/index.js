import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './components/Main';
import store from './store';
import { fetchNotifsStart } from './actions';

import './global.scss';

store.dispatch(fetchNotifsStart());

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById('root')
  );
};
