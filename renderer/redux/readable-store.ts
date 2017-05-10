import bindMethodContext from '../lib/utils/bind-method-context';
import { Store, Reducer, Unsubscribe } from 'redux';
import { Action } from './actions';

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
class ReadableStore<S, R> {
  private readonly store:  Store<S>;
  private readonly createReader: (state: S) => R;
  private _shouldUpdateReader: boolean;
  private _activated: boolean;
  private _reader: R;

  constructor(store: Store<S>, createReader: (state: S) => R) {
    this.store = store;
    this.createReader = createReader;
    this._shouldUpdateReader = true;
    this._activated = false;
    bindMethodContext(this);
  }

  getState(): S {
    return this.store.getState();
  }

  dispatch(action: Action<any>) {
    this.store.dispatch(action);
  }

  subscribe(listener: () => void): Unsubscribe {
    return this.store.subscribe(listener);
  }

  replaceReducer(nextReducer: Reducer<S>) {
    this.replaceReducer(nextReducer);
  }

  getReader(): R {
    if (this._shouldUpdateReader) {
      this._reader = this.createReader(this.store.getState());
      this._shouldUpdateReader = false;
    }
    return this._reader;
  }

  activate(): ReadableStore<S, R> {
    if (! this._activated) {
      this.subscribe(() => {
        this._shouldUpdateReader = true;
      });
    }
    return this;
  }
}

export default function createReadableStore<S, R>(
  store: Store<S>,
  createReader: (state: S) => R,
): ReadableStore<S, R> {
  return new ReadableStore(store, createReader).activate();
}
