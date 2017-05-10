import { Action } from './actions';

export interface DispatchProps {
  dispatch(action: Action<any>): void;
}
