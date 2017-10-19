import bindMethodContext from '../utils/bind-method-context';
import { GitHubAPI } from './types';
import { NotificationJSON } from '../../models/types';
import { Failable } from '../../models/result';

export default class GitHubNotifications {
  private readonly api: GitHubAPI;

  constructor(api: GitHubAPI) {
    this.api = api;
    bindMethodContext(this);
  }

  async listUnread(oldestDate?: string): Promise<Failable<NotificationJSON[]>> {
    const query = oldestDate ? `?before=${oldestDate}` : '';
    const { json, err } = await this.api.requestSoon<NotificationJSON[]>(`notifications${query}`);
    return [json, err];
  }

  async listUnreadInRepo(
    repoFullName: string, oldestDate?: string,
  ): Promise<Failable<NotificationJSON[]>> {
    const query = oldestDate ? `?before=${oldestDate}` : '';
    const { json, err } = await this.api.requestSoon<NotificationJSON[]>(
      `repos/${repoFullName}/notifications${query}`,
    );
    return [json, err];
  }
}
