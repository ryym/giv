import bindMethodContext from '../utils/bind-method-context';
import { GitHubAPI } from './types';
import { NotificationJSON } from '../../lib/models';
import Errors from '../errors';

export default class GitHubNotifications {
  private readonly api: GitHubAPI;

  constructor(api: GitHubAPI) {
    this.api = api;
    bindMethodContext(this);
  }

  async poll(lastModified?: string): Promise<{
    lastModified: string, interval: number, notifs: NotificationJSON[],
  } | null> {
    try {
      const headers = lastModified ? { 'If-Modified-Since': lastModified } : {};
      const res = await this.api.requestSoon('notifications', { headers });
      if (!res.ok) {
        return null;
      }
      const modified = res.headers.get('Last-Modified')!;
      const interval = Number(res.headers.get('X-Poll-Interval'));
      const notifs = (await res.json()) as NotificationJSON[];
      return { lastModified: modified, interval, notifs };
    }
    catch (err) {
      throw new Errors(err, `Failed to poll notifications (lastModified: ${lastModified})`);
    }
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

  async markAsRead(threadID: string): Promise<boolean> {
    try {
      const res = await this.api.requestSoon(
        `notifications/threads/${threadID}`,
        { method: 'POST' },
      );
      return res.ok;
    }
    catch (err) {
      throw new Errors(err, `Failed to mark a thread ${threadID} as read`);
    }
  }
}
