/**
 * Redux type safe utility for actions
 */

export interface Action<P = never> {
  type: string;
  payload: P;
}

interface ActionCreator0 {
  (): Action;
  type: string;
}

interface ActionCreator1<P, A1> {
  (a1: A1): Action<P>;
  type: string;
}

export type AnyActionCreator<P> =
    ActionCreator0 |
    ActionCreator1<P, any>;

export function createAction(type: string): ActionCreator0;

export function createAction<P, A>(
    type: string,
    makePayload: (arg: A) => P,
): ActionCreator1<P, A>;

export function createAction(type: any, makePayload: any = () => {}): any {
  const actionCreator = (arg: any) => ({
    type,
    payload: makePayload(arg),
  });

  // TypeScripe doesn't recognize `actionCreator.type = type`.
  // We must use `Object.assign` instead.
  return Object.assign(actionCreator, { type });
}

export function isAction<P>(
    creator: AnyActionCreator<P>,
    action: Action<any>,
): action is Action<P> {
  return action.type === creator.type;
}
