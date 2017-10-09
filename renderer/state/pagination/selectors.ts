import { State } from '../reducer';
import { getNotification } from '../entities/selectors';
import { Notification } from '../../models/types';

export const getUnreadNotifs = (state: State): Notification[] => {
  const unreadIDs = state.pagination.notifications.unread.ids;
  return unreadIDs.map((id) => getNotification(state, id)!);
};

export const getFilteredNotifs = (state: State): Notification[] => {
  const unreadNotifs = getUnreadNotifs(state);
  const { filter } = state.pagination.notifications;
  if (filter.fullName) {
    return unreadNotifs.filter((n) => n.repository === filter.fullName);
  }
  return unreadNotifs;
};

export const getSelectedRepo = (state: State): string => {
  return state.pagination.notifications.filter.fullName || '';
};
