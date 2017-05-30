import { push as pushHistory } from 'react-router-redux';
import { createAction as action, Action } from './redux/actions';
import { UserConfig, NormalizedNotifs, Notification, Issue } from './models/types';
import { NotifFilter } from './models/notif-filter';

// react-router-redux
export const Push = pushHistory;

export type UpdateTokenParam = { accessToken: string };
export const UpdateToken = action(
    'UPDATE_TOKEN',
    (accessToken: string) => ({ accessToken }),
);

export const LoadUserConfig = action(
    'LOAD_USER_CONFIG',
);

export type LoadUserConfigSuccessParam = UserConfig;
export const LoadUserConfigSuccess = action(
    'LOAD_USER_CONFIG_SUCCESS',
    (config: UserConfig) => config,
);

export type FetchNotifsParam = { oldestUpdatedAt?: string };
export const FetchNotifs = action(
    'FETCH_UNREAD_NOTIFS',
    (date?: string) => ({ oldestUpdatedAt: date }),
);

export const FetchNotifsStart = action(
    'FETCH_UNREAD_NOTIFS_START',
);

export type FetchNotifsSuccessParam = NormalizedNotifs;
export const FetchNotifsSuccess = action(
    'FETCH_UNREAD_NOTIFS_SUCCESS',
    (data: NormalizedNotifs) => data,
);

export type SelectNotifParam = { notif: Notification };
export const SelectNotif = action(
    'SELECT_NOTIF',
    (notif: {}) => ({ notif }),
);

export type FetchIssueSuccessParam = { issue: Issue };
export const FetchIssueSuccess = action(
    'FETCH_ISSUE_SUCCESS',
    (issue: Issue) => ({ issue }),
);

export const FilterNotifs = action(
  'FILTER_NOTIFS',
  (filters: NotifFilter) => filters,
);
