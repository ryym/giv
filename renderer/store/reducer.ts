import { combineReducers } from 'redux';
import State from './state';
import entities from './entities/reducer';
import notifications from './notifications/reducer';
import userConfig from './user-config/reducer';

export default combineReducers<State>({
  notifications,
  entities,
  userConfig,
});
