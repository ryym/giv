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

export default store;
