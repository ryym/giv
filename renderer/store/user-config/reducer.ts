import { UserConfig as UserConfigState } from '../state';
import { Action } from '../../action-types';

export default (config: UserConfigState | null = null, action: Action) => {
  switch (action.type) {
  case 'LOAD_USER_CONFIG_OK':
    return { ...action.config };

  case 'UPDATE_TOKEN':
    return {
      ...config,
      accessToken: action.accessToken,
    };

  default:
    return config;
  }
};

// export default reduce<UserConfigState>(null, [
//   on(LoadUserConfigSuccess, (current, config) => ({
//     ...config
//   })),

//   on(UpdateToken, (config, { accessToken }) => ({
//     ...config, accessToken,
//   })),
// ]);
