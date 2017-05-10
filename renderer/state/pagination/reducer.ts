import { combineReducers, Reducer } from 'redux';
import { updateNotifications, NotificationsState } from './notifications';

export type PaginationState = {
  notifications: NotificationsState,
};

export default combineReducers<PaginationState>({
  notifications: updateNotifications,
});
