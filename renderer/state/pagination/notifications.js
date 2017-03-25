import {
  FETCH_UNREAD_NOTIFS_SUCCESS,
} from '../../actions';

const initialState = {
  unread: {
    ids: [],
  },
};

export const updateNotifications = (notifs = initialState, action) => {
  switch (action.type) {
  case FETCH_UNREAD_NOTIFS_SUCCESS:
    return handleFetchNotifsSuccess(notifs, action.payload);
  default:
    return notifs;
  }
};

const handleFetchNotifsSuccess = (notifs, { result: ids }) => {
  return {
    unread: {
      ids,
    },
  };
};

