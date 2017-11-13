import { Action } from '../../action-types';
import { AsyncThunk } from '../types';
import Errors from '../../lib/errors';

export function alertError(err: Error): AsyncThunk {
  return async (dispatch) => {
    alert(err.message || 'Unexpected error occurred');
    if (err instanceof Errors) {
      // tslint:disable-next-line:no-console
      console.error('CAUSE: ', err.cause);
    }

    dispatch({ type: 'CLEAR_ERROR' });
  };
}
