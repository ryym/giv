import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from '../redux/thunk-middleware';
import { Store } from './types';
import ThunkContext from './thunk-context';
import reducer from './reducer';

export default function configureStore(opts: {
  history: History,
}) {
  return createStore(
    reducer,
    applyMiddleware(
      thunkMiddleware(new ThunkContext()),
      createLogger(),

      routerMiddleware(opts.history),
    ),
  ) as Store;
}
