import {
  FETCH_UNREAD_NOTIFS_SUCCESS,
} from '../../actions';

const initialState = {
  notifications: {
    byID: {},
  },
  repositories: {
    byFullName: {},
  },
};

const cloneEntities = ({ notifications, repositories }) => ({
  notifications: {
    byID: Object.assign({}, notifications.byID),
  },
  repositories: {
    byFullName: Object.assign({}, repositories.byFullName),
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
  Object.assign(cloned.repositories.byFullName, newEntities.repository);
  return cloned;
};
