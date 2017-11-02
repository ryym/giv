import bindMethodContext from '../utils/bind-method-context';
import { GitHubAPI, PageLinks } from './types';
import { NotificationJSON } from '../../lib/models';
import Errors from '../errors';
import { paramsToQuery, extractLinks, extractPage } from './lib';

export type ListUnreadParams = {
  all?: boolean,
  participating?: boolean,
  since?: string,
  before?: string,
};

export const NOTIFS_PER_PAGE = 50;

export default class GitHubNotifications {
  private readonly api: GitHubAPI;

  constructor(api: GitHubAPI) {
    this.api = api;
    bindMethodContext(this);
  }

  async poll(lastModified?: string): Promise<{
    lastModified: string,
    interval: number,
    notifs: NotificationJSON[],
    links: PageLinks | null,
  } | null> {
    try {
      const headers = lastModified ? { 'If-Modified-Since': lastModified } : {};
      const res = await this.api.requestSoon('notifications', { headers });
      if (!res.ok) {
        return null;
      }
      const modified = res.headers.get('Last-Modified')!;
      const interval = Number(res.headers.get('X-Poll-Interval'));

      const link = res.headers.get('Link');
      const links = link ? extractLinks(link) : null;

      const notifs = (await res.json()) as NotificationJSON[];
      return { lastModified: modified, interval, notifs, links };
    }
    catch (err) {
      throw new Errors(err, `Failed to poll notifications (lastModified: ${lastModified})`);
    }
  }

  async listUnread(params: ListUnreadParams = {}): Promise<NotificationJSON[] | null> {
    try {
      const query = paramsToQuery(params);
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

  async countAllUnread(lastPageURL: string, perPage = NOTIFS_PER_PAGE): Promise<number | null> {
    const lastPage = extractPage(lastPageURL);
    if (lastPage == null) {
      return null;
    }

    let res: Response;
    try {
      res = await this.api.requestSoon(lastPageURL);
    }
    catch (err) {
      return null;
    }

    if (!res.ok) {
      return null;
    }
    const lastNotifs = await res.json() as NotificationJSON[];
    return perPage * (lastPage - 1) + lastNotifs.length;
  }
}
