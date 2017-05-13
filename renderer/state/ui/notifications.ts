import { composeReducer, on } from '../../redux/reducer';
import {
  SelectNotif,
  SelectNotifParam,
  FetchNotifsStart,
  FetchNotifsSuccess,
} from '../../actions';

export type NotificationsState = {
  readonly shownURL: string | undefined,
  readonly isLoading: boolean,
};

const initialState: NotificationsState = {
  shownURL: undefined,
  isLoading: false,
};

export const updateNotifications = composeReducer(initialState, [
  on(SelectNotif, handleSelectNotif),

  on(FetchNotifsStart, (state) => Object.assign({}, state, { isLoading: true })),

  on(FetchNotifsSuccess, (state) => Object.assign({}, state, { isLoading: false })),
]);

function handleSelectNotif(
  state: NotificationsState,
  { notif }: SelectNotifParam,
): NotificationsState {
  // TODO: Do not parse URL by hand!
  // To get a proper URL, we need to fetch the issue JSON via API..
  const paths = notif.subject.url.split('/');
  const id = paths[paths.length - 1];
  const type = (notif.subject.type === 'PullRequest') ? 'pull' : 'issues';
  const url = `https://github.com/${notif.repository}/${type}/${id}`;

  return Object.assign({}, state, { shownURL: url });
}
