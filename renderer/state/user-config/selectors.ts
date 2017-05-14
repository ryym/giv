import { State } from '../reducer';

export const isConfigLoaded = (state: State): boolean => {
  return state.userConfig != null;
};

export const getAccessToken = (state: State): string => {
  return state.userConfig ? state.userConfig.accessToken : '';
};
