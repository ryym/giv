import {
  FetchNotifsSuccess,
  FetchIssueSuccess,
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
  case FetchNotifsSuccess.type:
    return handleFetchNotifsSuccess(entities, action.payload);

  case FetchIssueSuccess.type:
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
