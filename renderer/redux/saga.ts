/**
 * Wrap some Saga effects to use them more type-safely.
 */

import * as Saga from 'redux-saga/effects';

interface CallEffectFactory<R> {
  (f: () => any): R;
  <A1>(f: (a1: A1) => any, a1: A1): R;
  <A1, A2>(f: (a1: A1, a2: A2) => any, a1: A1, a2: A2): R;
  <A1, A2, A3>(f: (a1: A1, a2: A2, a3: A3) => any, a1: A1, a2: A2, a3: A3): R;
}

export const call: CallEffectFactory<Saga.Effect> = Saga.call;
export const fork: CallEffectFactory<Saga.ForkEffect> = Saga.fork;
export const take = Saga.take;
export const takeEvery = Saga.takeEvery;
export const put = Saga.put;
export const spawn = Saga.spawn;
