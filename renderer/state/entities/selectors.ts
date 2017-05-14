import { State } from '../reducer';
import {
  Notification,
  Repository,
  Issue,
  NotifCounts,
  WritableNotifCounts,
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

export const countNotifsPerRepo = (state: State): NotifCounts => {
  const { notifications: notifs, repositories: repos } = state.entities;
  return Object.keys(notifs.byID).reduce(
    (counts: WritableNotifCounts, notifID) => {
      const notif = notifs.byID[notifID];
      const repo = repos.byFullName[notif.repository];

      if (!(repo.owner in counts)) {
        counts[repo.owner] = {};
      }
      if (!(repo.name in counts[repo.owner])) {
        counts[repo.owner][repo.name] = 0;
      }

      counts[repo.owner][repo.name] += 1;
      return counts;
    }, {},
  );
};

export const NotifSelector = {
  getIssueURL: (notif: Notification) => notif.subject.url,

  getTitle: (notif: Notification) => notif.subject.title,

  isPR: (notif: Notification) => notif.subject.type === 'PullRequest',
};
