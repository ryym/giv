import {
  sendNewToken,
  fetchUserConfig,
  logout as logoutGitHub,
} from '../../lib/ipc';
import createGitHubClient, { GitHubClient } from '../../lib/github-api';
import { LoginUser } from '../../lib/models';
import { AsyncThunk } from '../types';

async function assertTokenIsValid(api: GitHubClient, token: string): Promise<LoginUser> {
  const user = await api.users.getAuthenticatedUser();
  if (user == null) {
    throw new Error('The access token is invalid.');
  }
  return user;
}

export function updateToken(accessToken: string): AsyncThunk {
  return async (dispatch, getState, { initGitHubAPI }) => {
    const api = createGitHubClient(accessToken);
    const user = await assertTokenIsValid(api, accessToken);

    sendNewToken(accessToken);
    initGitHubAPI(accessToken);

    dispatch({
      type: 'LOG_IN',
      accessToken,
      user,
    });
  };
}

export function loadUserConfig(): AsyncThunk {
  return async (dispatch, getState, { initGitHubAPI }) => {
    const config = await fetchUserConfig();
    if (!config.accessToken) {
      return;
    }

    const api = createGitHubClient(config.accessToken);
    const user = await assertTokenIsValid(api, config.accessToken);

    initGitHubAPI(config.accessToken);
    dispatch({
      type: 'LOAD_USER_CONFIG_OK',
      config,
      user,
    });
  };
}

export function saveAccessToken(token: string): AsyncThunk {
  return async () => sendNewToken(token);
}

export function logout(): AsyncThunk {
  return async (dispatch, getState, { github }) => {
    await logoutGitHub();
    dispatch({ type: 'LOG_OUT' });
  };
}
