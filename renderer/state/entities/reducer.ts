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
} from '../../models/types';
import { composeReducer, on } from '../../redux/reducer';

type NotifEntities = {
  readonly byID: {
    [id: string]: Notification,
  },
};

type RepoEntities = {
  readonly byFullName: {
    [fullname: string]: Repository,
  },
};

type IssueEntities = {
  readonly byURL: {
    [url: string]: Issue,
  },
};

export type EntitiesState = {
  readonly notifications: NotifEntities,
  readonly repositories: RepoEntities,
  readonly issues: IssueEntities,
};

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

// Example: replaceState({ a:1 }, ['a', n => n + 1])
const replaceState = <T extends {}, K extends keyof T>(
  original: T,
  replacers: Array<[K, (v: T[K]) => T[K]]>,
): T => {
  return replacers.reduce((clone: T, [key, replace]) => {
    clone[key] = replace(original[key]);
    return clone;
  }, Object.assign({}, original));
};

const updateEntities = composeReducer(initialState, [
  on(FetchNotifsSuccess, handleFetchNotifsSuccess),
  on(FetchIssueSuccess, handleFetchIssueSuccess),
]);
export default updateEntities;

function handleFetchNotifsSuccess(
  entities: EntitiesState,
  { entities: newEntities }: FetchNotifsSuccessParam,
): EntitiesState {
  return replaceState(entities, [
    ['notifications', ({ byID }: NotifEntities) => ({
      byID: Object.assign({}, byID, newEntities.notification),
    })],
    ['repositories', ({ byFullName }: RepoEntities) => ({
      byFullName: Object.assign({}, byFullName, newEntities.repository),
    })],
  ]);
}

function handleFetchIssueSuccess(
  entities: EntitiesState,
  { issue }: FetchIssueSuccessParam,
): EntitiesState {
  return replaceState(entities, [
    ['issues', ({ byURL }) => ({
      byURL: Object.assign({}, byURL, { [issue.url]: issue }),
    })],
  ]);
}
