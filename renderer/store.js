import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import reducers from './reducers';
import sagas from './sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    applyMiddleware(
      sagaMiddleware,
      createLogger(),

      // Apply router middleware after the logger
      // to log router actions.
      routerMiddleware(history),
    )
  );

  sagaMiddleware.run(sagas);

  return store;
}
