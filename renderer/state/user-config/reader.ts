import { UserConfigState } from './reducer';

export const makeUserConfigReader = (config: UserConfigState) => new UserConfigReader(config);

export class UserConfigReader {
  private readonly config: UserConfigState;

  constructor(config: UserConfigState) {
    this.config = config;
  }

  get isLoaded() {
    return this.config != null;
  }

  get accessToken() {
    return this.config ? this.config.accessToken : '';
  }
}
