import {
  FETCH_NOTIFS_SUCCESS,
} from '../actions';

// TODO: Use immutable.js

export default (state = {}, action) => {
  switch (action.type) {
  case FETCH_NOTIFS_SUCCESS:
    return { notifications: action.payload };
  default:
    return { notifications: [] };
  }
};
