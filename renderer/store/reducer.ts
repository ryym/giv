import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import State from './state';
import login from './login/reducer';
import entities from './entities/reducer';
import notifications from './notifications/reducer';
import appError from './app-error/reducer';

export default combineReducers<State>({
  login,
  notifications,
  entities,
  appError,
  router: routerReducer,
});
