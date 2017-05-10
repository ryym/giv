import { combineReducers } from 'redux';
import { updateNotifications, NotificationsState } from './notifications';

export type UIState = {
  notifications: NotificationsState,
};

export default combineReducers<UIState>({
  notifications: updateNotifications,
});
