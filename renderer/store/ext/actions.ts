/**
 * Define actions that do not modify the state.
 */

import { Action } from '../../action-types';
import { Thunk } from '../types';
import { openExternal } from '../../lib/ipc';

export function openInExternalBrowser(url: string): Thunk {
  return () => {
    openExternal(url);
  };
}
