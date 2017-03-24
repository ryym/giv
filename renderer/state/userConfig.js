import {
  UPDATE_TOKEN,
  LOAD_USER_CONFIG_SUCCESS,
} from '../actions';

export const updateUserConfig = (config = null, action) => {
  switch (action.type) {
  case LOAD_USER_CONFIG_SUCCESS:
    return Object.assign({}, action.payload);
  case UPDATE_TOKEN:
    return Object.assign({}, config, {
      accessToken: action.payload.token,
    });
  default:
    return config;
  }
};

export const makeUserConfigReader = config => new UserConfigReader(config);

class UserConfigReader {
  constructor(config) {
    this.config = config;
  }

  get isLoaded() {
    return this.config != null;
  }

  get accessToken() {
    return this.config.accessToken;
  }
}
