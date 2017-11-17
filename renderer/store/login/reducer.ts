import { LoginState } from '../state';
import { Action } from '../../action-types';

export default (login: LoginState | null = null, action: Action) => {
  if (login === null) {
    return login;
  }
  switch (action.type) {
  case 'LOAD_USER_CONFIG_OK':
    return {
      ...login,
      config: { ...action.config },
    };

  case 'UPDATE_TOKEN':
    return {
      ...login,
      config: {
        ...login.config,
        accessToken: action.accessToken,
      },
    };
  }
};
