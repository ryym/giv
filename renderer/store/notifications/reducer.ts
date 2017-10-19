import { Action } from '../../action-types';
import { Notifications } from '../state';
import { Notification, NotifFilter } from '../../models/types';

const initialState: Notifications = {
  isLoading: true,
  shownURL: undefined,
  filter: {},
  ids: [],
};

export default (notifs: Notifications = initialState, action: Action) => {
  switch (action.type) {
  case 'FETCH_UNREAD_NOTIFS_START':
    return {
      ...notifs,
      isLoading: true,
    };

  case 'FETCH_UNREAD_NOTIFS_OK':
    return {
      ...notifs,
      isLoading: false,
      ids: concatUniq(notifs.ids, action.data.result),
    };

  case 'SELECT_NOTIF':
    return {
      ...notifs,
      shownURL: extractIssueURL(action.notif),
    };

  case 'FILTER_NOTIFS':
    return {
      ...notifs,
      filter: determineNextFilter(notifs.filter, action.filter),
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

const extractIssueURL = (notif: Notification): string => {
  // TODO: Do not parse URL by hand!
  // To get a proper URL, we need to fetch the issue JSON via API..
  const paths = notif.subject.url.split('/');
  const id = paths[paths.length - 1];
  const type = (notif.subject.type === 'PullRequest') ? 'pull' : 'issues';
  return `https://github.com/${notif.repository}/${type}/${id}`;
};

const determineNextFilter = (current: NotifFilter, got: NotifFilter): NotifFilter =>
  current.fullName === got.fullName ? {} : got;
