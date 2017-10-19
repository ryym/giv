import { sendNewToken, fetchUserConfig } from '../../lib/ipc';
import { AsyncThunk } from '../types';

// TODO: What happen if a user registers a wrong access token?

export function updateToken(accessToken: string): AsyncThunk {
  return async (dispatch, _, { initGitHubAPI }) => {
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
