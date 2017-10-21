import bindMethodContext from '../utils/bind-method-context';
import { GitHubAPI } from './types';
import { NotificationJSON } from '../../models/types';
import Errors from '../errors';

export default class GitHubNotifications {
  private readonly api: GitHubAPI;

  constructor(api: GitHubAPI) {
    this.api = api;
    bindMethodContext(this);
  }

  async listUnread(oldestDate?: string): Promise<NotificationJSON[] | null> {
    try {
      const query = oldestDate ? `?before=${oldestDate}` : '';
      const res = await this.api.requestSoon(`notifications${query}`);
      return res.ok ? (await res.json()) as NotificationJSON[] : null;
    }
    catch (err) {
      throw new Errors(err, 'Failed to fetch notifications');
    }
  }

  async listUnreadInRepo(
    repoFullName: string, oldestDate?: string,
  ): Promise<NotificationJSON[] | null> {
    try {
      const query = oldestDate ? `?before=${oldestDate}` : '';
      const res = await this.api.requestSoon(
        `repos/${repoFullName}/notifications${query}`,
      );
      return res.ok ? (await res.json()) as NotificationJSON[] : null;
    }
    catch (err) {
      throw new Errors(err, 'Failed to fetch notifications in repo');
    }
  }
}
