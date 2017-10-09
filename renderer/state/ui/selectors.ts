import { State } from '../reducer';
import { NotifFilter } from '../../models/types';

export const isLoadingNotifs = (state: State): boolean => {
  return state.ui.notifications.isLoading;
};

export const getShownNotificationURL = (state: State): string | undefined => {
  return state.ui.notifications.shownURL;
};
