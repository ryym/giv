import bindMethodContext from '../utils/bind-method-context';

export default class GitHubNotifications {
  constructor(api) {
    this._api = api;
    bindMethodContext(this);
  }

  // TODO: pagination
  async listUnread(oldestDate) {
    const query = oldestDate ? `?before=${oldestDate}` : '';
    const { json, err } = await this._api.requestSoon(`notifications${query}`);

    return { notifications: json, err };
  }
}
