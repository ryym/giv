import { RouterState } from 'react-router-redux';
import {
  Notification, Issue, Repository, NotifFilter,
  UserConfig, LoginUser,
} from '../lib/models';

export default interface State {
  readonly login: LoginState | null;
  readonly entities: Entities;
  readonly notifications: Notifications;
  readonly appError: AppError;
  readonly router: RouterState;
}

export interface LoginState {
  config: UserConfig;
  user: LoginUser;
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
  readonly ids: string[];
  readonly allUnreadCount: number | undefined;
}

export interface AppError {
  readonly err: Error | null;
}
