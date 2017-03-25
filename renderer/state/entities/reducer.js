import {
  FETCH_UNREAD_NOTIFS_SUCCESS,
} from '../../actions';

const initialState = {
  notifications: {
    byID: {},
  },
};

const cloneEntities = ({ notifications }) => ({
  notifications: {
    byID: Object.assign({}, notifications.byID),
  },
});

export default function updateEntities(entities = initialState, action) {
  switch (action.type) {
  case FETCH_UNREAD_NOTIFS_SUCCESS:
    return handleFetchNotifsSuccess(entities, action.payload);
  default:
    return entities;
  }
}

const handleFetchNotifsSuccess = (entities, { entities: newEntities }) => {
  const cloned = cloneEntities(entities);
  Object.assign(cloned.notifications.byID, newEntities.notification);
  return cloned;
};
