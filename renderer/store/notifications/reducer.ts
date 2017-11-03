import { Action } from '../../action-types';
import { Notifications } from '../state';
import { Notification, NotifFilter } from '../../lib/models';
import { extractIssueURL } from './lib';

const initialState: Notifications = {
  isLoading: true,
  shownURL: undefined,
  filter: {},
  ids: [],
  allUnreadCount: undefined,
};

export default (notifs: Notifications = initialState, action: Action) => {
  switch (action.type) {
  case 'FETCH_UNREAD_NOTIFS_START':
  case 'REFRESH_NOTIFS_START':
    return {
      ...notifs,
      isLoading: true,
    };

  case 'POLL_NOTIFS_OK':
    return {
      ...notifs,
      isLoading: action.isFirst ? false : notifs.isLoading,
      ids: concatUniq(action.data.result, notifs.ids),
    };

  case 'FETCH_UNREAD_NOTIFS_OK':
    return {
      ...notifs,
      isLoading: false,
      ids: concatUniq(notifs.ids, action.data.result),
    };

  case 'REFRESH_NOTIFS_OK':
    return {
      ...notifs,
      isLoading: false,
      ids: action.data.result.concat(action.unreadIDs),
    };

  case 'SELECT_NOTIF':
    return action.openExternal ? notifs : {
      ...notifs,
      shownURL: extractIssueURL(action.notif),
    };

  case 'FILTER_NOTIFS':
    return {
      ...notifs,
      filter: determineNextFilter(notifs.filter, action.filter),
    };

  case 'COUNT_ALL_UNREAD_NOTIFS_OK':
    return {
      ...notifs,
      allUnreadCount: action.count,
    };

  default:
    return notifs;
  }
};

// concatUniq([1,2,3], [3,4,5]) => [1,2,3,4,5]
const concatUniq = (ids1: string[], ids2: string[]): string[] => {
  type ExistIDs = { [id: string]: boolean };
  const exists: ExistIDs = ids1.reduce((ex: ExistIDs, id) => {
    ex[id] = true;
    return ex;
  }, {});
  const uniqIds2 = ids2.filter((id) => ! exists[id]);
  return ids1.concat(uniqIds2);
};

const determineNextFilter = (current: NotifFilter, got: NotifFilter): NotifFilter =>
  current.fullName === got.fullName ? {} : got;
