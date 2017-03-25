import GitHubAPI from './api';
import GitHubNotifications from './notifications';

const GITHUB_API_HOST = 'api.github.com';

export default function createGitHubClient(accessToken) {
  const api = new GitHubAPI(accessToken, {
    apiHost: GITHUB_API_HOST,
  });
  return {
    notifications: new GitHubNotifications(api),
  };
}
