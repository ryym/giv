export type UserConfig = {
  readonly accessToken: string,
};

interface BaseNotification {
  readonly id: string;
  readonly updated_at: string;
  readonly subject: {
    readonly title: string,
    readonly url: string,
    readonly type: 'Issue' | 'PullRequest',
  };
}

export interface NotificationJSON extends BaseNotification {
  readonly repository: {};
}

export interface Notification extends BaseNotification {
  readonly repository: string;
}

export interface User {
  readonly id: number;
  readonly login: string;
}

export interface Repository {
  readonly id: number;
  readonly full_name: string;
  readonly owner: User;
}

export interface Issue {
  readonly id: number;
  readonly url: string;
  readonly state: string;
  readonly merged: boolean;
}

export interface NormalizedNotifs {
  readonly entities: {
    readonly notification: {
      [id: string]: Notification,
    },
    readonly repository: {
      [fullName: string]: Repository,
    },
    readonly user: {
      [login: string]: User,
    },
  };
  readonly result: string[];
}
