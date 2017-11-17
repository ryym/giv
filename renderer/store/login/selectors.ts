import State from '../state';
import { LoginUser } from '../../lib/models';

export const isConfigLoaded = (state: State): boolean => {
  return state.login !== null;
};

export const getAccessToken = (state: State): string => {
  const { login } = state;
  return login ? login.config.accessToken : '';
};

export const getLoginUser = (state: State): LoginUser | null => {
  const { login } = state;
  return login ? login.user : null;
};
