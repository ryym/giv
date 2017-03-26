import { SELECT_NOTIF } from '../../actions';

const initialState = {
  shownURL: null,
};

export const updateNotifications = (state = initialState, action) => {
  switch (action.type) {
  case SELECT_NOTIF:
    return handleSelectNotif(state, action.payload);
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
