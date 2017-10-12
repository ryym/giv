import { sendNewToken, fetchUserConfig } from '../../lib/ipc';
import { AsyncThunk } from '../types';
import { Action } from '../../action-types';

export const updateToken = (accessToken: string): Action => ({
  type: 'UPDATE_TOKEN',
  accessToken,
});

export function loadUserConfig(): AsyncThunk {
  return async (dispatch, getState, { initGitHubAPI }) => {
    const config = await fetchUserConfig();
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

// function some(s, action: Action) {
//   switch (action.type) {
//     case LoadUserConfig.type:
//       return {
//         ...s, isLoading: false
//       }

//     case LoadUserConfigErr.type:
//       return {
//         ...s,
//         err: action.err
//       }
//   }
// }
