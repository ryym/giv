import {
  FETCH_UNREAD_NOTIFS_SUCCESS,
  FETCH_ISSUE_SUCCESS,
} from '../../actions';

const initialState = {
  notifications: {
    byID: {},
  },
  repositories: {
    byFullName: {},
  },
  issues: {
    byURL: {},
  },
};

// XXX: We don't need to clone unchanged entity sections.
const cloneEntities = ({ notifications, repositories, issues }) => ({
  notifications: {
    byID: Object.assign({}, notifications.byID),
  },
  repositories: {
    byFullName: Object.assign({}, repositories.byFullName),
  },
  issues: {
    byURL: Object.assign({}, issues.byURL),
  },
});

export default function updateEntities(entities = initialState, action) {
  switch (action.type) {
  case FETCH_UNREAD_NOTIFS_SUCCESS:
    return handleFetchNotifsSuccess(entities, action.payload);

  case FETCH_ISSUE_SUCCESS:
    return handleFetchIssueSuccess(entities, action.payload);

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

const handleFetchIssueSuccess = (entities, { issue }) => {
  const cloned = cloneEntities(entities);
  cloned.issues.byURL[issue.url] = issue;
  return cloned;
};
