import { combineReducers } from 'redux';
import {
  NotifEntities, RepoEntities, IssueEntities, Entities,
} from '../state';

import { Action } from '../../action-types';

// // XXX: こんな感じで細かく reducer を区切るべきだったか

const initialNotifs = { byID: {} };
const notifsReducer = (notifs: NotifEntities = initialNotifs, action: Action) => {
  switch (action.type) {
  case 'FETCH_UNREAD_NOTIFS_OK':
    return {
      ...notifs,
      byID: {
        ...notifs.byID,
        ...action.data.entities.notification,
      },
    };

  default:
    return notifs;
  }
};

const initialIssues = { byURL: {} };
const issuesReducer = (issues: IssueEntities = initialIssues, action: Action) => {
  switch (action.type) {
    // TODO: handle FETCH_ISSUE_OK
  default:
    return issues;
  }
};

const initialRepos = { byFullName: {} };
const reposReducer = (repos: RepoEntities = initialRepos, action: Action) => {
  switch (action.type) {
  case 'FETCH_UNREAD_NOTIFS_OK':
    return {
      ...repos,
      byFullName: {
        ...repos.byFullName,
        ...action.data.entities.repository,
      },
    };

  default:
    return repos;
  }
};

export default combineReducers<Entities>({
  notifications: notifsReducer,
  issues: issuesReducer,
  repositories: reposReducer,
});
