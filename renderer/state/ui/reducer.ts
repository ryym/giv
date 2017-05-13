import { combineReducers } from 'redux';
import { updateNotifications, NotificationsState } from './notifications';

export type UIState = {
  readonly notifications: NotificationsState,
};

export default combineReducers<UIState>({
  notifications: updateNotifications,
});
