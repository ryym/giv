import { Action, AnyActionCreator } from './actions';

export type Handler<S, P> = (state: S, payload: P, action: Action<P>) => S;

interface ActionHandler<S, P> {
  type: string;
  handle: Handler<S, P>;
}

export const on = <S, P>(
    creator: AnyActionCreator<P>,
    handler: Handler<S, P>,
): ActionHandler<S, P> => {
  return { type: creator.type, handle: handler };
};

/**
 * You can compose a reducer type-safely by this `composeReducer` and `on`.
 *
 * Example:
 *
 * const reducer = composeReducer(initialState, [
 *   on(AddTodo, handleAddTodo),
 *   on(ChangeFilter, handleChangeFilter),
 *   // ...
 * ])
 * const handleAddTodo = (state: TodoState, { id }: AddTodoParam) => {
 *   // ...
 * }
 */
export const composeReducer = <S>(
    initialState: S,
    handlers: Array<ActionHandler<S, any>> = [],
): (state: S, action: Action<any>) => S => {
  type ByType = { [type: string]: Handler<S, any> };

  const handlerByType: ByType = handlers.reduce((hbt: ByType, handler) => {
    hbt[handler.type] = handler.handle;
    return hbt;
  }, {});

  return function reduce(state: S = initialState, action: Action<any>): S {
    const handler = handlerByType[action.type];
    if (handler != null) {
      return handler(state, action.payload, action);
    }
    return state;
  };
};
