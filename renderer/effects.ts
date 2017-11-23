import { Store } from './store/types';
import { getUnreadNotifs } from './store/selectors';
import { updateAppIconState } from './lib/ipc';

export default function registerSideEffects(store: Store) {
  let prevNotifCount = -1;
  store.subscribe(() => {
    const count = store.getState().notifications.allUnreadCount;
    if (count && count !== prevNotifCount) {
      prevNotifCount = count;
      updateAppIconState(count);
    }
  });
}
