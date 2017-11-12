import { combineReducers } from 'redux';
import {
  NotifEntities, RepoEntities, IssueEntities, Entities,
} from '../state';

import { Action } from '../../action-types';

// // XXX: こんな感じで細かく reducer を区切るべきだったか

const initialNotifs = { byID: {} };
const notifsReducer = (notifs: NotifEntities = initialNotifs, action: Action) => {
  switch (action.type) {
  case 'POLL_NOTIFS_OK':
  case 'FETCH_UNREAD_NOTIFS_OK':
  case 'REFRESH_NOTIFS_OK': // Should remove read notifications?
    return {
      ...notifs,
      byID: {
        ...notifs.byID,
        ...action.data.entities.notification,
      },
    };

  case 'SELECT_NOTIF':
  case 'MARK_NOTIF_AS_READ_START': {
    const { notif } = action;
    return {
      ...notifs,
      byID: {
        ...notifs.byID,
        [notif.id]: { ...notif, unread: false },
      },
    };
  }

  case 'MARK_ALL_AS_READ_OK':
    return {
      ...notifs,
      byID: {},
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
  case 'POLL_NOTIFS_OK':
  case 'FETCH_UNREAD_NOTIFS_OK':
  case 'REFRESH_NOTIFS_OK':
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
