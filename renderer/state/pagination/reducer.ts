import { combineReducers, Reducer } from 'redux';
import { updateNotifications, NotificationsState } from './notifications';

export type PaginationState = {
  readonly notifications: NotificationsState,
};

export default combineReducers<PaginationState>({
  notifications: updateNotifications,
});
