import { State } from '../reducer';
import { getNotification } from '../entities/selectors';
import { Notification } from '../../models/types';

export const getUnreadNotifs = (state: State): Notification[] => {
  const unreadIDs = state.pagination.notifications.unread.ids;
  return unreadIDs.map((id) => getNotification(state, id)!);
};
