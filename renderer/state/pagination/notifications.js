import {
  FetchNotifsSuccess,
} from '../../actions';

const initialState = {
  unread: {
    ids: [],
  },
};

export const updateNotifications = (notifs = initialState, action) => {
  switch (action.type) {
  case FetchNotifsSuccess.type:
    return handleFetchNotifsSuccess(notifs, action.payload);

  default:
    return notifs;
  }
};

const handleFetchNotifsSuccess = (notifs, { result: ids }) => {
  return {
    unread: {
      ids: concatUniq(notifs.unread.ids, ids),
    },
  };
};

const concatUniq = (ids1, ids2) => {
  const exists = ids1.reduce((ex, id) => {
    ex[id] = true;
    return ex;
  }, {});
  const uniqIds2 = ids2.filter(id => ! exists[id]);
  return ids1.concat(uniqIds2);
};
