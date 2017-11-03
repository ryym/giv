import {
  UserConfig, Issue, NotifFilter,
  NormalizedNotifs, Notification,
} from './lib/models';

export type Action
  = { type: 'UPDATE_TOKEN', accessToken: string }
  | { type: 'LOAD_USER_CONFIG' }
  | { type: 'LOAD_USER_CONFIG_OK', config: UserConfig }
  | { type: 'FETCH_UNREAD_NOTIFS', oldestDate?: string }
  | { type: 'FETCH_UNREAD_NOTIFS_START', repoFullName?: string }
  | { type: 'FETCH_UNREAD_NOTIFS_OK', data: NormalizedNotifs }
  | { type: 'SELECT_NOTIF', notif: Notification, openExternal?: boolean }
  | { type: 'FETCH_ISSUE_OK', issue: Issue }
  | { type: 'FILTER_NOTIFS', filter: NotifFilter }
  | { type: 'CATCH_ERROR', err: Error }
  | { type: 'MARK_NOTIF_AS_READ_START', notif: Notification }
  | { type: 'MARK_NOTIF_AS_READ_OK', notif: Notification }
  | { type: 'POLL_NOTIFS_START' }
  | { type: 'POLL_NOTIFS_OK', data: NormalizedNotifs, isFirst: boolean }
  | { type: 'REFRESH_NOTIFS_START' }
  | { type: 'REFRESH_NOTIFS_OK', data: NormalizedNotifs, unreadIDs: string[] }
  | { type: 'COUNT_ALL_UNREAD_NOTIFS_OK', count: number }

  // react-router-redux
  | { type: '@@router/CALL_HISTORY_METHOD' };
