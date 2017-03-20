import { List } from 'immutable';
import { combineReducers } from 'redux';
import {
  UPDATE_TOKEN,
  FETCH_NOTIFS_SUCCESS,
} from '../actions';

const token = (token = null, action) => {
  switch (action.type) {
  case UPDATE_TOKEN:
    return action.payload.token;
  default:
    return null;
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
  token,
  notifications,
});
