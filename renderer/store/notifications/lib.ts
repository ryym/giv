import { Notification } from '../../lib/models';

// XXX: Do not parse URL by hand!
// To get a proper URL, we need to fetch the issue JSON via API..
export const extractIssueURL = (notif: Notification): string => {
  // They are API URLs, not HTML URLs. Therefore we need to convert them by hand.
  // - url: https://api.github.com/repos/:owner/:name/issues/:number
  // - comment url: https://api.github.com/repos/:owner/:name/issues/comments/:id
  const { latest_comment_url: commentUrl, url } = notif.subject;

  const issueNumber = url.match(/(\d+)$/)![1];
  const type = (notif.subject.type === 'PullRequest') ? 'pull' : 'issues';

  // `subject.latest_comment_url` is often a normal issue URL same as `subject.url`.
  // So we should use it only when it is a comment URL.
  if (commentUrl != null && commentUrl.includes('comments')) {
    const id = commentUrl.match(/(\d+)$/)![1];
    return `https://github.com/${notif.repository}/${type}/${issueNumber}#issuecomment-${id}`;
  }

  return `https://github.com/${notif.repository}/${type}/${issueNumber}`;
};
