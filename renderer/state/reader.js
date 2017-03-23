import { makeUserConfigReader } from './userConfig';

export default function createStateReader(state) {
  return new StateReader(state);
}

class StateReader {
  constructor(state) {
    this.state = state;
    this._cache = {};
  }

  _getOrMake(name, create) {
    if (! this._cache[name]) {
      this._cache[name] = create(this.state[name]);
    }
    return this._cache[name];
  }

  get userConfig() {
    return this._getOrMake('userConfig', makeUserConfigReader);
  }
}
