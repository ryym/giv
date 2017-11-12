import bindMethodContext from '../utils/bind-method-context';
import { User } from '../models';
import { GitHubAPI } from './types';
import Errors from '../errors';

export default class GitHubUsers {
  private readonly api: GitHubAPI;

  constructor(api: GitHubAPI) {
    this.api = api;
    bindMethodContext(this);
  }

  async getAuthenticatedUser(): Promise<User | null> {
    try {
      const res = await this.api.requestSoon('user');
      return res.ok ? (await res.json()) as User : null;
    }
    catch (err) {
      throw new Errors(err, 'Failed to fetch authenticated user');
    }
  }
}
