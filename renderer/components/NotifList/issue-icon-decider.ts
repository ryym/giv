import { Issue } from '../../models/types';

export type IconState = 'is-unknown' | 'is-open' | 'is-closed' | 'is-merged';

const iconMap: { [iconType: string]: [string, IconState] } = {
  'issue-unknown': ['issue-opened', 'is-unknown'],
  'issue-open': ['issue-opened', 'is-open'],
  'issue-closed': ['issue-closed', 'is-closed'],
  'pull-unknown': ['git-pull-request', 'is-unknown'],
  'pull-open': ['git-pull-request', 'is-open'],
  'pull-closed': ['git-pull-request', 'is-closed'],
  'pull-merged': ['git-pull-request', 'is-merged'],
};

export default function getIconDataFor(issue: Issue, isPR: boolean): [string, IconState] {
  const type = isPR ? 'pull' : 'issue';

  if (issue == null) {
    return iconMap[`${type}-unknown`];
  }
  if (! isPR) {
    return iconMap[`issue-${issue.state}`];
  }

  const state = issue.state === 'open'
    ? 'open'
    : issue.merged ? 'merged' : 'closed';
  return iconMap[`pull-${state}`];
}
