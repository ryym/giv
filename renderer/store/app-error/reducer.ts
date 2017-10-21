import { Action } from '../../action-types';
import { AppError } from '../state';

const initialState: AppError = {
  err: null,
};

export default (s = initialState, action: Action): AppError => {
  switch (action.type) {
  case 'CATCH_ERROR':
    return {
      ...s,
      err: action.err,
    };

  default:
    return s;
  }
};
