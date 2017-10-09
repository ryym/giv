import { Action } from '../../action-types';
import { AsyncThunk } from '../types';
import { Notification, NotifFilter } from '../../models/types';
import normalizeNotifications from '../../lib/normalizers/notifications';

export const selectNotif = (notif: Notification): Action => ({
  type: 'SELECT_NOTIF', notif,
});

export const filterNotifs = (filter: NotifFilter): Action => ({
  type: 'FILTER_NOTIFS', filter,
});

export function fetchUnreadNotifs(oldestUpdatedAt?: string): AsyncThunk {
  return async (dispatch, getState, { github }) => {
    dispatch({ type: 'FETCH_UNREAD_NOTIFS_START' });

    const [notifs, _] = await github.notifications.listUnread(oldestUpdatedAt);

    if (notifs != null) {
      const normalizedNotifs = normalizeNotifications(notifs);
      dispatch({
        type: 'FETCH_UNREAD_NOTIFS_OK',
        data: normalizedNotifs,
      });
    }
  };
}

// function fetchIssues(notifs) {
//   return async ({ dispatch }, { github }) => {
//     for (const notif of notifs) {
//       const [issue, _] = await github.issues.getIssue(notif.subject.url);
//       if (issue != null) {
//         dispatch({ type: 'FETCH_ISSUE_OK', issue })
//       }
//     }
//   }
// }
