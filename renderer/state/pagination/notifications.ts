import { composeReducer, on, Handler } from '../../redux/reducer'
import {
  FetchNotifsSuccess,
  FetchNotifsSuccessParam,
} from '../../actions';

export type NotificationsState = {
  unread: {
    ids: string[],
  }
}

const initialState: NotificationsState = {
  unread: {
    ids: [],
  },
};

export const updateNotifications = composeReducer(initialState, [
  on(FetchNotifsSuccess, handleFetchNotifsSuccess),
])

function handleFetchNotifsSuccess(
  notifs: NotificationsState,
  { result: ids }: FetchNotifsSuccessParam,
): NotificationsState {
  return {
    unread: {
      ids: concatUniq(notifs.unread.ids, ids),
    },
  };
};

const concatUniq = (ids1: string[], ids2: string[]): string[] => {
  type ExistIDs = { [id: string]: boolean }
  const exists: ExistIDs = ids1.reduce((ex: ExistIDs, id) => {
    ex[id] = true;
    return ex;
  }, {});
  const uniqIds2 = ids2.filter(id => ! exists[id]);
  return ids1.concat(uniqIds2);
};
