import State from '../state';

export const isConfigLoaded = (state: State): boolean => {
  return state.login !== null;
};

export const getAccessToken = (state: State): string => {
  const { login } = state;
  return login == null ? '' : login.config.accessToken;
};
