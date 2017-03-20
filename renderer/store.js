import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware,
    createLogger()
  )
);

sagaMiddleware.run(sagas);

export default store;
