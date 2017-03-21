import loadStorage from './storage';

const CONFIG_STORAGE_KEY = 'giv-user-config';

class UserConfig {
  constructor(storage) {
    this._s = storage;
  }

  getAccessToken() {
    return this._s.get('accessToken');
  }

  setAccessToken(token) {
    return this._s.set('accessToken', token);
  }

  clear() {
    return this._s.clear();
  }

  toJSON() {
    return this._s.toJSON();
  }
}

export default function loadUserConfig() {
  return loadStorage(CONFIG_STORAGE_KEY).
    then(storage => new UserConfig(storage));
}
