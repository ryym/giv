import { Notification } from '../../models/types';

export const extractIssueURL = (notif: Notification): string => {
  // TODO: Do not parse URL by hand!
  // To get a proper URL, we need to fetch the issue JSON via API..
  const paths = notif.subject.url.split('/');
  const id = paths[paths.length - 1];
  const type = (notif.subject.type === 'PullRequest') ? 'pull' : 'issues';
  return `https://github.com/${notif.repository}/${type}/${id}`;
};
