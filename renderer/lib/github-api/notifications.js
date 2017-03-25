import bindMethodContext from '../utils/bind-method-context';

export default class GitHubNotifications {
  constructor(api) {
    this._api = api;
    bindMethodContext(this);
  }

  request(path, options) {
    return this._api.request(path, options);
  }

  // TODO: pagination
  async listUnread() {
    const { json, err } = await this.request('notifications');
    return { notifications: json, err };
  }
}
