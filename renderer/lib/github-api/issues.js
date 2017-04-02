import bindMethodContext from '../utils/bind-method-context';

export default class GitHubIssues {
  constructor(api) {
    this._api = api;
    bindMethodContext(this);
  }

  request(path, options) {
    return this._api.request(path, options);
  }

  async getIssue(url) {
    const { json, err } = await this.request(url);
    return { issue: json, err };
  }
}
