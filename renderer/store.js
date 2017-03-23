import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { Iterable } from 'immutable'
import history from './history';
import sagas from './sagas';
import createReader from './state/reader';
import createReducer from './state/reducer';
import createReadableStore from './redux/readable-store';

const configureLogger = () => {
  const stateTransformer = state => Object.keys(state).reduce((snap, name) => {
    const slice = state[name]
    snap[name] = Iterable.isIterable(slice) ? slice.toJS() : slice;
    return snap
  }, {})
  return createLogger({
    stateTransformer,
  })
}

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createReducer(),
    applyMiddleware(
      sagaMiddleware,
      configureLogger(),

      // Apply router middleware after the logger
      // to log router actions.
      routerMiddleware(history),
    )
  );

  sagaMiddleware.run(sagas);

  return createReadableStore(store, createReader);
}
