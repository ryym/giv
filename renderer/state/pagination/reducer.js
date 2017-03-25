import { combineReducers } from 'redux';
import { updateNotifications } from './notifications';

export default combineReducers({
  notifications: updateNotifications,
});
