import { Middleware, MiddlewareAPI } from 'redux';

export default function thunkMiddleware<C = void>(context: C): Middleware {
  return <S>({ dispatch, getState }: MiddlewareAPI<S>) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, context);
    }
    return next(action);
  };
}
