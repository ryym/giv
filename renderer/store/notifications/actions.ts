import { Action } from '../../action-types';
import { AsyncThunk } from '../types';
import { Notification, NotificationJSON, NotifFilter } from '../../lib/models';
import { GitHubClient } from '../../lib/github-api';
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
  return async (dispatch, getState, context) => {
    dispatch({ type: 'POLL_NOTIFS_START' });

    const poll = async (interval: number, lastModified?: string) => {
      if (getState().login == null) {
        return;
      }

      // Get the GitHub client from the context each time
      // to avoid holding an old client after a user change
      // the access token.
      const { github } = context;

      const res = await github.notifications.poll(lastModified);
      if (res !== null) {
        dispatch({
          type: 'POLL_NOTIFS_OK',
          isFirst: !lastModified,
          data: normalizeNotifications(res.notifs),
        });

        const lastPageURL = res.links ? res.links.last : undefined;
        countAllUnreadNotifs(github, lastPageURL, res.notifs);

        lastModified = res.lastModified;
        interval = res.interval * 1000;
      }
      setTimeout(() => poll(interval, lastModified), interval);
    };

    const countAllUnreadNotifs = async (
      github: GitHubClient,
      lastPageURL: string | undefined,
      notifs: NotificationJSON[],
    ) => {
      const count = lastPageURL == null
        ? notifs.length
        : await github.notifications.countAllUnread(lastPageURL);
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

export function markAllAsRead(): AsyncThunk {
  return async (dispatch, getState, { github }) => {
    const state = getState();
    const newest = getNotification(state, state.notifications.ids[0]);

    if (newest != null) {
      dispatch({ type: 'MARK_ALL_AS_READ_START' });
      await github.notifications.markAllAsRead(newest.updated_at);
      dispatch({ type: 'MARK_ALL_AS_READ_OK' });
    }
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
