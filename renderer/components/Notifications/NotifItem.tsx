import * as React from 'react';
import Octicon from '../shared/Octicon';
import { NotifSelector as NotifSl } from '../../state/selectors';
import { Notification, Issue, Repository } from '../../models/types';

export type Props = {
  notif: Notification,
  repo: Repository,
  issue: Issue,
  onClick: (notif: Notification) => void,
};

/* eslint-disable camelcase */
const iconMap: { [iconType: string]: [string, string] } = {
  issue_unknown: ['issue-opened', 'is-unknown'],
  issue_open: ['issue-opened', 'is-open'],
  issue_closed: ['issue-closed', 'is-closed'],
  pull_unknown: ['git-pull-request', 'is-unknown'],
  pull_open: ['git-pull-request', 'is-open'],
  pull_closed: ['git-pull-request', 'is-closed'],
  pull_merged: ['git-pull-request', 'is-merged'],
};
/* eslint-enable camelcase */

const getIconDataFor = (issue: Issue, isPR: boolean): [string, string] => {
  const type = isPR ? 'pull' : 'issue';

  if (issue == null) {
    return iconMap[`${type}_unknown`];
  }
  if (! isPR) {
    return iconMap[`issue_${issue.state}`];
  }

  const state = issue.state === 'open'
    ? 'open'
    : issue.merged ? 'merged' : 'closed';
  return iconMap[`pull_${state}`];
};

export default function NotifItem({ notif, repo, issue, onClick }: Props) {
  const [iconName, iconStateClass] = getIconDataFor(issue, NotifSl.isPR(notif));
  return (
    <div className="notifs_notif-wrapper">
      <a className="notifs_notif" onClick={() => onClick(notif)}>
        <Octicon className={`notifs_notif-kind ${iconStateClass}`} icon={iconName} />
        <div className="notifs_notif-body">
          <div className="notifs_notif-title">
            {notif.subject.title}
          </div>
          <div className="notifs_notif-repo">
            {repo.full_name}
          </div>
          <time className="notifs_notif-time">
            {notif.updated_at}
          </time>
        </div>
      </a>
    </div>
  );
}
