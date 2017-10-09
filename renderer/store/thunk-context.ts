import createGitHubClient, { GitHubClient } from '../lib/github-api';

export default class ThunkContext {
  constructor(
    private api: GitHubClient | null = null,
  ) {}

  get github(): GitHubClient {
    if (this.api === null) {
      throw new Error('[ThunkContext] GitHub API does not be initialized yet');
    }
    return this.api;
  }

  initGitHubAPI = (token: string): void => {
    this.api = createGitHubClient(token);
  }
}
