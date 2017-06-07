import { composeReducer, on, Handler } from '../../redux/reducer';
import {
  FetchNotifsSuccess,
  FetchNotifsSuccessParam,
  FilterNotifs,
} from '../../actions';
import { NotifFilter } from '../../models/notif-filter';

export type NotificationsState = {
  readonly unread: {
    readonly ids: string[],
  },
  readonly filter: NotifFilter,
};

const initialState: NotificationsState = {
  unread: {
    ids: [],
  },
  filter: {},
};

export const updateNotifications = composeReducer(initialState, [
  on(FetchNotifsSuccess, handleFetchNotifsSuccess),
  on(FilterNotifs, handleFilterNotifs),
]);

function handleFetchNotifsSuccess(
  notifs: NotificationsState,
  { result: ids }: FetchNotifsSuccessParam,
): NotificationsState {
  return Object.assign({}, notifs, {
    unread: {
      ids: concatUniq(notifs.unread.ids, ids),
    },
  });
}

function handleFilterNotifs(
  notifs: NotificationsState,
  filter: NotifFilter,
): NotificationsState {
  const nextFilter = notifs.filter.fullName === filter.fullName ? {} : filter
  return Object.assign({}, notifs, { filter: nextFilter });
}

const concatUniq = (ids1: string[], ids2: string[]): string[] => {
  type ExistIDs = { [id: string]: boolean };
  const exists: ExistIDs = ids1.reduce((ex: ExistIDs, id) => {
    ex[id] = true;
    return ex;
  }, {});
  const uniqIds2 = ids2.filter((id) => ! exists[id]);
  return ids1.concat(uniqIds2);
};
