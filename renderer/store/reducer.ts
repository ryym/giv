import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { Action } from '../action-types';
import State from './state';
import login from './login/reducer';
import entities from './entities/reducer';
import notifications from './notifications/reducer';
import appError from './app-error/reducer';

const rootReducer = combineReducers<State>({
  login,
  notifications,
  entities,
  appError,
  router: routerReducer,
});

export default (state: State, action: Action): State => {
  if (action.type === 'LOG_OUT') {
    return rootReducer({} as any, action); // Reset whole state.
  }
  return rootReducer(state, action);
};
