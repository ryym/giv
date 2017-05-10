import bindMethodContext from '../utils/bind-method-context';
import { GitHubAPI } from './types';
import { Issue } from '../../models/types';
import { Failable } from '../../models/result';

export default class GitHubIssues {
  private readonly _api: GitHubAPI;
  constructor(api: GitHubAPI) {
    this._api = api;
    bindMethodContext(this);
  }

  async getIssue(url: string): Promise<Failable<Issue>> {
    const { json, err } = await this._api.request<Issue>(url);
    return [json, err];
  }
}
