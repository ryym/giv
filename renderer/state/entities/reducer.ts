import {
  FetchNotifsSuccess,
  FetchNotifsSuccessParam,
  FetchIssueSuccess,
  FetchIssueSuccessParam,
} from '../../actions';
import {
  Notification,
  Repository,
  Issue,
} from '../../models/types'
import { composeReducer, on } from '../../redux/reducer'

export type EntitiesState = {
  notifications: {
    byID: {
      [id: string]: Notification
    },
  },
  repositories: {
    byFullName: {
      [fullname: string]: Repository
    },
  },
  issues: {
    byURL: {
      [url: string]: Issue
    },
  },
}

const initialState: EntitiesState = {
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
const cloneEntities = ({ notifications, repositories, issues }: EntitiesState): EntitiesState => ({
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

const updateEntities = composeReducer(initialState, [
  on(FetchNotifsSuccess, handleFetchNotifsSuccess),
  on(FetchIssueSuccess, handleFetchIssueSuccess),
])
export default updateEntities

function handleFetchNotifsSuccess(
  entities: EntitiesState,
  { entities: newEntities }: FetchNotifsSuccessParam
): EntitiesState {
  const cloned = cloneEntities(entities);
  Object.assign(cloned.notifications.byID, newEntities.notification);
  Object.assign(cloned.repositories.byFullName, newEntities.repository);
  return cloned;
};

function handleFetchIssueSuccess(
  entities: EntitiesState,
  { issue }: FetchIssueSuccessParam
): EntitiesState {
  const cloned = cloneEntities(entities);
  cloned.issues.byURL[issue.url] = issue;
  return cloned;
};
