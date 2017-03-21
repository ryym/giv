import JsonStorage from './json-storage';

class Storage {
  constructor(storage, storageKey, currentData) {
    this._s = storage;
    this._storageKey = storageKey;
    this._json = currentData;
  }

  get(key) {
    return Promise.resolve(this._json[key]);
  }

  set(key, value) {
    this._json[key] = value;
    return this._s.set(this._storageKey, this._json);
  }

  clear() {
    this._json = {};
    return this._s.clear();
  }

  toJSON() {
    const clone = JSON.parse(JSON.stringify(this._json));
    return Promise.resolve(clone);
  }
}

export default function loadStorage(
  key,
  makeJsonStorage = s => new JsonStorage(s)
) {
  const jsonStorage = makeJsonStorage();
  return jsonStorage.get(key).then(data => {
    return new Storage(jsonStorage, key, data);
  });
}

