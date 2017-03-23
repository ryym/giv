import { Map, List } from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  UPDATE_TOKEN,
  FETCH_NOTIFS_SUCCESS,
  LOAD_USER_CONFIG_SUCCESS,
} from '../actions';

const userConfig = (config = null, action) => {
  switch (action.type) {
  case LOAD_USER_CONFIG_SUCCESS:
    return Map(action.payload);
  case UPDATE_TOKEN:
    return config.set('accessToken', action.payload.token);
  default:
    return config;
  }
};

const notifications = (notifs = List(), action) => {
  switch (action.type) {
  case FETCH_NOTIFS_SUCCESS:
    return List(action.payload);
  default:
    return notifs;
  }
};

export default combineReducers({
  userConfig,
  notifications,
  router: routerReducer,
});
