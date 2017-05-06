export type UserConfig = {
    accessToken: string,
}

interface BaseNotification {
  id: string,
  updated_at: string,
  subject: {
      title: string,
      url: string,
      type: 'Issue' | 'PullRequest',
  }
}

export interface NotificationJSON extends BaseNotification {
    repository: {}
}

export interface Notification extends BaseNotification {
    repository: string,
}

export interface User {
  id: number,
  login: string,
}

export interface Repository {
  id: number,
  full_name: string,
  owner: User,
}

export interface Issue {
  id: number,
  url: string,
  state: string,
  merged: boolean,
}

export interface NormalizedNotifs {
  entities: {
    notification: {
        [id: string]: Notification
    },
    repository: {
        [full_name: string]: Repository
    },
    user: {
        [login: string]: User,
    }
  },
  result: string[],
}
