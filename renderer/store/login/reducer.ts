import { LoginState } from '../state';
import { Action } from '../../action-types';

export default (login: LoginState | null = null, action: Action) => {
  switch (action.type) {
  case 'LOAD_USER_CONFIG_OK':
    return {
      user: action.user,
      config: action.config,
    };

  case 'UPDATE_TOKEN':
    return {
      user: action.user,
      config: {
        ...(login ? login.config : {}),
        accessToken: action.accessToken,
      },
    };

  default:
    return login;
  }
};
