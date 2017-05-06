import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import sagas from './sagas';
import createReader from './state/reader';
import createReducer from './state/reducer';
import createReadableStore from './redux/readable-store';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createReducer(),
    applyMiddleware(
      sagaMiddleware,
      createLogger(),

      // Apply router middleware after the logger
      // to log router actions.
      routerMiddleware(history),
    )
  );

  sagaMiddleware.run(sagas);

  return createReadableStore(store, createReader);
}
