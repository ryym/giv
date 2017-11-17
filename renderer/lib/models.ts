export interface UserConfig {
  readonly accessToken: string;
}

export interface User {
  readonly id: number;
  readonly login: string;
  readonly avatar_url: string;
}

export interface LoginUser extends User {
  readonly name: string;
}

interface BaseNotification {
  readonly id: string;
  readonly updated_at: string;
  readonly unread: boolean;
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

export interface Repository {
  readonly id: number;
  readonly name: string;
  readonly full_name: string;
  readonly owner: string;
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

export type NotifCounts = {
  readonly [owner: string]: {
    readonly [repoName: string]: number,
  },
};
export type WritableNotifCounts = {
  [owner: string]: {
    [repoName: string]: number,
  },
};

export interface NotifFilter {
  fullName?: string;
}
