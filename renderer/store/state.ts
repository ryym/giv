import { Notification, Issue, Repository, NotifFilter } from '../models/types';

export default interface State {
  readonly userConfig: UserConfig | null;
  readonly entities: Entities;
  readonly notifications: Notifications;
}

export interface UserConfig {
  readonly accessToken: string;
}

export interface Entities {
  readonly notifications: NotifEntities;
  readonly repositories: RepoEntities;
  readonly issues: IssueEntities;
}

export interface NotifEntities {
  readonly byID: {
    [id: string]: Notification,
  };
}

export interface RepoEntities {
  readonly byFullName: {
    [fullname: string]: Repository,
  };
}

export interface IssueEntities {
  readonly byURL: {
    [url: string]: Issue,
  };
}

export interface Notifications {
  readonly isLoading: boolean;
  readonly shownURL: string | undefined;
  readonly filter: NotifFilter;
  readonly unreadIDs: string[];
}
