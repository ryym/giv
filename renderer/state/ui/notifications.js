import {
  SelectNotif,
  FetchNotifsStart,
  FetchNotifsSuccess,
} from '../../actions';

const initialState = {
  shownURL: null,
  isLoading: false,
};

export const updateNotifications = (state = initialState, action) => {
  switch (action.type) {
  case SelectNotif.type:
    return handleSelectNotif(state, action.payload);

  case FetchNotifsStart.type:
    return Object.assign({}, state, { isLoading: true });

  case FetchNotifsSuccess.type:
    return Object.assign({}, state, { isLoading: false });

  default:
    return state;
  }
};

const handleSelectNotif = (state, { notif }) => {
  // TODO: Do not parse URL by hand!
  // To get a proper URL, we need to fetch the issue JSON via API..
  const paths = notif.subject.url.split('/');
  const id = paths[paths.length - 1];
  const type = (notif.subject.type === 'PullRequest') ? 'pull' : 'issues';
  const url = `https://github.com/${notif.repository}/${type}/${id}`;

  return Object.assign({}, state, { shownURL: url });
};
