import {
  UserConfig, Issue, NotifFilter,
  NormalizedNotifs, Notification,
} from './models/types';

export type Action
  = { type: 'UPDATE_TOKEN', accessToken: string }
  | { type: 'LOAD_USER_CONFIG' }
  | { type: 'LOAD_USER_CONFIG_OK', config: UserConfig }
  | { type: 'FETCH_UNREAD_NOTIFS', oldestDate?: string }
  | { type: 'FETCH_UNREAD_NOTIFS_START', repoFullName?: string }
  | { type: 'FETCH_UNREAD_NOTIFS_OK', data: NormalizedNotifs }
  | { type: 'SELECT_NOTIF', notif: Notification }
  | { type: 'FETCH_ISSUE_OK', issue: Issue }
  | { type: 'FILTER_NOTIFS', filter: NotifFilter }
  | { type: 'CATCH_ERROR', err: Error }

  // react-router-redux
  | { type: '@@router/CALL_HISTORY_METHOD' };
