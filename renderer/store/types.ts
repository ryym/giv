import { Unsubscribe } from 'redux';
import State from './state';
import { Action } from '../action-types';
import ThunkContext from './thunk-context';

export type AnyAction = { type: string };

export type ReduxDispatch<A extends AnyAction> = <_A extends A>(action: _A) => _A;

export type Dispatch = ReduxDispatch<Action> & (<R>(thunk: Thunk<R>) => R);

export interface ReduxStore<S, D> {
  getState(): S;
  dispatch: D;
  subscribe(listener: () => void): Unsubscribe;
}

export type Store = ReduxStore<State, Dispatch>;

export type Thunk<R = void> = (
  dispatch: Dispatch,
  getState: () => State,
  context: ThunkContext,
) => R;

export type AsyncThunk<R = void> = Thunk<Promise<R>>;
