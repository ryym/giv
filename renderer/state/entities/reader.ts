import bindMethodContext from '../../lib/utils/bind-method-context';
import { EntitiesState } from './reducer'
import {
  Notification,
  Repository,
  Issue,
} from '../../models/types'

export default function makeEntitiesReader(entities: EntitiesState) {
  return new EntitiesReader(entities);
}

export class EntitiesReader {
  private readonly entities: EntitiesState

  constructor(entities: EntitiesState) {
    this.entities = entities;
    bindMethodContext(this);
  }

  getNotification(id: string): Notification | null {
    return this.entities.notifications.byID[id];
  }

  getRepository(fullName: string): Repository | null {
    return this.entities.repositories.byFullName[fullName];
  }

  getIssue(url: string): Issue | null {
    return this.entities.issues.byURL[url];
  }
}

export const NotifReader = {
  getIssueURL: (notif: Notification) => notif.subject.url,

  getTitle: (notif: Notification) => notif.subject.title,

  isPR: (notif: Notification) => notif.subject.type === 'PullRequest',
};
