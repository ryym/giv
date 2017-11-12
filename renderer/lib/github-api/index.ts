import GitHubAPI from './api';
import GitHubNotifications from './notifications';
import GitHubIssues from './issues';
import GitHubUsers from './users';
import { API_ROOT } from '../../const/config';

export type GitHubClient = {
  notifications: GitHubNotifications,
  issues: GitHubIssues,
  users: GitHubUsers,
};

// TODO: 401 also returns JSON. We need to handle this properly.

export default function createGitHubClient(accessToken: string): GitHubClient {
  const api = new GitHubAPI(accessToken, {
    apiRoot: API_ROOT,
  });
  return {
    notifications: new GitHubNotifications(api),
    issues: new GitHubIssues(api),
    users: new GitHubUsers(api),
  };
}
