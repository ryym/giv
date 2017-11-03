import { Action } from '../../action-types';
import { AsyncThunk } from '../types';
import { Notification, NotifFilter } from '../../lib/models';
import normalizeNotifications from '../../lib/normalizers/notifications';
import { openExternal } from '../../lib/ipc';
import { extractIssueURL } from './lib';
import { getNotification } from '../selectors';

export const selectNotif = (notif: Notification): Action => ({
  type: 'SELECT_NOTIF', notif,
});

export const openNotifExternal = (notif: Notification): AsyncThunk => {
  return async (dispatch) => {
    openExternal(extractIssueURL(notif));
    dispatch({
      type: 'SELECT_NOTIF',
      notif,
      openExternal: true,
    });
  };
};

export const filterNotifs = (filter: NotifFilter): Action => ({
  type: 'FILTER_NOTIFS', filter,
});

export function pollNotifications(): AsyncThunk {
  return async (dispatch, getState, { github }) => {
    dispatch({ type: 'POLL_NOTIFS_START' });

    const poll = async (interval: number, lastModified?: string) => {
      const res = await github.notifications.poll(lastModified);
      if (res !== null) {
        dispatch({
          type: 'POLL_NOTIFS_OK',
          isFirst: !lastModified,
          data: normalizeNotifications(res.notifs),
        });

        if (res.links && res.links.last) {
          countAllUnreadNotifs(res.links.last);
        }

        lastModified = res.lastModified;
        interval = res.interval * 1000;
      }
      setTimeout(() => poll(interval, lastModified), interval);
    };

    const countAllUnreadNotifs = async (lastPageURL: string) => {
      const count = await github.notifications.countAllUnread(lastPageURL);
      if (count != null) {
        dispatch({
          type: 'COUNT_ALL_UNREAD_NOTIFS_OK',
          count,
        });
      }
    };

    poll(0);
  };
}

export type FetchUnreadNotifsPayload = {
  repoFullName?: string,
  oldestUpdatedAt?: string,
};

// TODO: Fetch each issue/PR status (open, closed, merged).
export function fetchUnreadNotifs({
  repoFullName, oldestUpdatedAt,
}: FetchUnreadNotifsPayload = {}): AsyncThunk {
  return async (dispatch, getState, { github: { notifications: notifsAPI } }) => {
    dispatch({
      type: 'FETCH_UNREAD_NOTIFS_START',
      ...(repoFullName ? { repoFullName } : {}),
    });

    const notifs = repoFullName
      ? await notifsAPI.listUnreadInRepo(repoFullName, oldestUpdatedAt)
      : await notifsAPI.listUnread({ before: oldestUpdatedAt });

    if (notifs != null) {
      const normalizedNotifs = normalizeNotifications(notifs);
      dispatch({
        type: 'FETCH_UNREAD_NOTIFS_OK',
        data: normalizedNotifs,
      });
    }
    // TODO: Handle failures such as 404.
  };
}

export function markAsRead(notif: Notification): AsyncThunk {
  return async (dispatch, getState, { github }) => {
    dispatch({ type: 'MARK_NOTIF_AS_READ_START', notif });
    const marked = await github.notifications.markAsRead(notif.id);
    if (marked) {
      dispatch({ type: 'MARK_NOTIF_AS_READ_OK', notif });
    }
    // TODO: Handle failure case.
  };
}

// - Fetch latest notifications
// - Remove read notifications
export function refreshNotifs(): AsyncThunk {
  return async (dispatch, getState, { github }) => {
    dispatch({ type: 'REFRESH_NOTIFS_START' });

    let state = getState();
    const newest = getNotification(state, state.notifications.ids[0]);
    const notifs = await github.notifications.listUnread({
      since: newest ? newest.updated_at : undefined,
    });

    if (notifs == null) {
      // TODO: Handle failures such as 404.
      return;
    }

    state = getState();
    const unreadIDs = state.notifications.ids.filter((id) => {
      const notif = getNotification(state, id);
      return notif && notif.unread;
    });

    const data = normalizeNotifications(notifs);
    dispatch({ type: 'REFRESH_NOTIFS_OK', data, unreadIDs });
  };
}
