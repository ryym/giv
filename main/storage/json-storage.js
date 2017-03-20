import jsonStorage from 'electron-json-storage';

/**
 * JsonStorage wraps electron-json-storage and
 * provides Promise base API.
 */
export default class JsonStorage {
  constructor(storage = jsonStorage) {
    this._s = storage;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this._s.get(key, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this._s.set(key, value, err => {
        err ? reject(err) : resolve(value);
      });
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      this._s.clear(err => {
        err ? reject(err) : resolve();
      });
    });
  }
}

