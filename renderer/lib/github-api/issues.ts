import bindMethodContext from '../utils/bind-method-context';
import { GitHubAPI } from './types';
import { Issue } from '../../lib/models';

export default class GitHubIssues {
  private readonly api: GitHubAPI;
  constructor(api: GitHubAPI) {
    this.api = api;
    bindMethodContext(this);
  }

  async getIssue(url: string): Promise<Issue> {
    const res = await this.api.request(url);
    return (await res.json()) as Issue;
  }
}
