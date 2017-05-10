import bindMethodContext from '../utils/bind-method-context';
import { GitHubAPI } from './types';
import { NotificationJSON } from '../../models/types';
import { Failable } from '../../models/result';

export default class GitHubNotifications {
  private readonly _api: GitHubAPI;

  constructor(api: GitHubAPI) {
    this._api = api;
    bindMethodContext(this);
  }

  // TODO: pagination
  async listUnread(oldestDate?: string): Promise<Failable<NotificationJSON[]>> {
    const query = oldestDate ? `?before=${oldestDate}` : '';
    const { json, err } = await this._api.requestSoon<NotificationJSON[]>(`notifications${query}`);
    return [json, err];
  }
}
