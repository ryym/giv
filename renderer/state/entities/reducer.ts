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

// Example: replaceState({ a:1 }, ['a', n => n + 1])
const replaceState = <T extends {}, K extends keyof T>(
  original: T,
  replacers: Array<[K, (v: T[K]) => T[K]]>
): T => {
  return replacers.reduce((clone: T, [key, replace]) => {
    clone[key] = replace(original[key])
    return clone
  }, Object.assign({}, original))
}

const updateEntities = composeReducer(initialState, [
  on(FetchNotifsSuccess, handleFetchNotifsSuccess),
  on(FetchIssueSuccess, handleFetchIssueSuccess),
])
export default updateEntities

function handleFetchNotifsSuccess(
  entities: EntitiesState,
  { entities: newEntities }: FetchNotifsSuccessParam
): EntitiesState {
  return replaceState(entities, [
    ['notifications', () => ({ byID: newEntities.notification })],
    ['repositories', () => ({ byFullName: newEntities.repository })]
  ])
};

function handleFetchIssueSuccess(
  entities: EntitiesState,
  { issue }: FetchIssueSuccessParam
): EntitiesState {
  return replaceState(entities, [
    ['issues', ({ byURL }) => ({
      byURL: Object.assign({}, byURL, { [issue.url]: issue })
    })],
  ])
};
