import { State } from '../reducer';
import {
  Notification,
  Repository,
  Issue,
} from '../../models/types';

export const getNotification = (state: State, id: string): Notification | null => {
  return state.entities.notifications.byID[id];
};
export const getRepository = (state: State, fullName: string): Repository | null => {
  return state.entities.repositories.byFullName[fullName];
};

export const getIssue = (state: State, url: string): Issue | null => {
  return state.entities.issues.byURL[url];
};

export const NotifSelector = {
  getIssueURL: (notif: Notification) => notif.subject.url,

  getTitle: (notif: Notification) => notif.subject.title,

  isPR: (notif: Notification) => notif.subject.type === 'PullRequest',
};
