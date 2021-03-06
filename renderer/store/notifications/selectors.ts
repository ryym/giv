import State from '../state';
import { getNotification } from '../entities/selectors';
import { Notification } from '../../lib/models';

export const isLoadingNotifs = (state: State): boolean => {
  return state.notifications.isLoading;
};

export const getShownNotificationURL = (state: State): string | undefined => {
  return state.notifications.shownURL;
};

export const getUnreadNotifs = (state: State): Notification[] => {
  const ids = state.notifications.ids;
  return ids.map((id) => getNotification(state, id)!);
};

export const getFilteredNotifs = (state: State): Notification[] => {
  const unreadNotifs = getUnreadNotifs(state);
  const { filter } = state.notifications;
  if (filter.fullName) {
    return unreadNotifs.filter((n) => n.repository === filter.fullName);
  }
  return unreadNotifs;
};

export const getSelectedRepo = (state: State): string => {
  return state.notifications.filter.fullName || '';
};
