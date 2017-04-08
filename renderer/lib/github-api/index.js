import GitHubAPI from './api';
import GitHubNotifications from './notifications';
import GitHubIssues from './issues';

export default function createGitHubClient(accessToken) {
  const api = new GitHubAPI(accessToken, {
    apiRoot: $$API_ROOT,
  });
  return {
    notifications: new GitHubNotifications(api),
    issues: new GitHubIssues(api),
  };
}
