import {
  UpdateToken,
  LoadUserConfigSuccess,
} from '../actions';

export const updateUserConfig = (config = null, action) => {
  switch (action.type) {
  case LoadUserConfigSuccess.type:
    return Object.assign({}, action.payload);

  case UpdateToken.type:
    return Object.assign({}, config, {
      accessToken: action.payload.accessToken,
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
