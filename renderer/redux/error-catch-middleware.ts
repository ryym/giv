import { Middleware, MiddlewareAPI } from 'redux';

export default function errorCatchMiddleware(): Middleware {
  return <S>({ dispatch, getState }: MiddlewareAPI<S>) => (next) => (action) => {
    let result: any;

    try {
      result = next(action);
    }
    catch (err) {
      dispatch({ type: 'CATCH_ERROR', err });
    }

    if (result instanceof Promise) {
      result.catch((err: any) => {
        dispatch({ type: 'CATCH_ERROR', err });
        throw err;
      });
    }

    return result;
  };
}
