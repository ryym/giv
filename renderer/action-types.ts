import {
  UserConfig, LoginUser, Issue, NotifFilter,
  NormalizedNotifs, Notification,
} from './lib/models';

export type Action
  = { type: 'UPDATE_TOKEN', accessToken: string, user: LoginUser }
  | { type: 'LOAD_USER_CONFIG' }
  | { type: 'LOAD_USER_CONFIG_OK', config: UserConfig, user: LoginUser }
  | { type: 'FETCH_UNREAD_NOTIFS', oldestDate?: string }
  | { type: 'FETCH_UNREAD_NOTIFS_START', repoFullName?: string }
  | { type: 'FETCH_UNREAD_NOTIFS_OK', data: NormalizedNotifs }
  | { type: 'SELECT_NOTIF', notif: Notification, openExternal?: boolean }
  | { type: 'FETCH_ISSUE_OK', issue: Issue }
  | { type: 'FILTER_NOTIFS', filter: NotifFilter }
  | { type: 'CATCH_ERROR', err: Error }
  | { type: 'CLEAR_ERROR' }
  | { type: 'MARK_NOTIF_AS_READ_START', notif: Notification }
  | { type: 'MARK_NOTIF_AS_READ_OK', notif: Notification }
  | { type: 'POLL_NOTIFS_START' }
  | { type: 'POLL_NOTIFS_OK', data: NormalizedNotifs, isFirst: boolean }
  | { type: 'REFRESH_NOTIFS_START' }
  | { type: 'REFRESH_NOTIFS_OK', data: NormalizedNotifs, unreadIDs: string[] }
  | { type: 'COUNT_ALL_UNREAD_NOTIFS_OK', count: number }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'MARK_ALL_AS_READ_START' }
  | { type: 'MARK_ALL_AS_READ_OK' }

  // react-router-redux
  | { type: '@@router/CALL_HISTORY_METHOD' };
