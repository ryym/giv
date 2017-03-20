import loadStorage from './storage';

const CONFIG_STORAGE_KEY = 'giv-user-config';

class UserConfig {
  constructor(storage) {
    this._s = storage;
  }

  getAccessToken() {
    return this._s.get('access-token');
  }

  setAccessToken(token) {
    return this._s.set('access-token', token);
  }
}

export default function loadUserConfig() {
  return loadStorage(CONFIG_STORAGE_KEY).
    then(storage => new UserConfig(storage));
}
