import { sendNewToken, fetchUserConfig } from '../../lib/ipc';
import createGitHubClient from '../../lib/github-api';
import { AsyncThunk } from '../types';

// TODO: Restructure state about user
// login: { config: UserConfig, user: User } ?

export function updateToken(accessToken: string): AsyncThunk {
  return async (dispatch, _, { initGitHubAPI }) => {
    const api = createGitHubClient(accessToken);
    const user = await api.users.getAuthenticatedUser();
    if (user == null) {
      throw new Error('The access token is invalid.');
    }

    // TODO: Show the got data and let a user confirm it.

    sendNewToken(accessToken);
    initGitHubAPI(accessToken);

    dispatch({
      type: 'UPDATE_TOKEN',
      accessToken,
    });
  };
}

export function loadUserConfig(): AsyncThunk {
  return async (dispatch, getState, { initGitHubAPI }) => {
    const config = await fetchUserConfig();
    if (!config.accessToken) {
      return;
    }

    initGitHubAPI(config.accessToken);
    dispatch({
      type: 'LOAD_USER_CONFIG_OK',
      config,
    });
  };
}

export function saveAccessToken(token: string): AsyncThunk {
  return async () => sendNewToken(token);
}
