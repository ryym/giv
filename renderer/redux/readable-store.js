import bindMethodContext from '../lib/utils/bind-method-context';

/**
 * ReadableStore provides same API with Redux Store.
 * In addition, it has a new method named `getReader`
 * which returns Reader object.
 *
 * Reader is a wrapper of an app state which provides:
 * - safe readonly access to the state
 * - additional accessor method to the state
 * This aims to hide state implementation details
 * from Redux middlewares and view components.
 * Only reducers should be able to access the raw state directly.
 *
 * Although we can use `enhancer` option to add `getReader` to Store
 * (http://redux.js.org/docs/api/createStore.html),
 * we decide to just wrap a store in new class because
 * an enhanced store couldn't be statically typed.
 */
class ReadableStore {
  constructor(store, createReader) {
    this.store = store;
    this.createReader = createReader;
    this._shouldUpdateReader = true;
    bindMethodContext(this);
  }

  getState() {
    return this.store.getState();
  }

  dispatch(action) {
    return this.store.dispatch(action);
  }

  subscribe(listener) {
    return this.store.subscribe(listener);
  }

  replaceReducer(nextReducer) {
    return this.replaceReducer(nextReducer);
  }

  getReader() {
    if (this._shouldUpdateReader) {
      this._reader = this.createReader(this.store.getState());
      this._shouldUpdateReader = false;
    }
    return this._reader;
  }

  activate() {
    this.subscribe(() => {
      this._shouldUpdateReader = true;
    });
    return this;
  }
}

export default function createReadableStore(store, createReader) {
  return new ReadableStore(store, createReader).activate();
}
