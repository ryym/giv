import React from 'react';
import classes from 'classnames';
import { NotifSelector as NotifSl } from '../../store/selectors';
import { Notification, Issue } from '../../models/types';
import Octicon from '../widgets/Octicon';
import decideIcon from './issue-icon-decider';

export type Props = {
  notif: Notification,
  repoName: string,
  issue: Issue,
  onClick: (notif: Notification) => void,
};

export default function NotifItem({
  notif, repoName, issue, onClick,
}: Props) {
  const [iconName, iconStateClass] = decideIcon(issue, NotifSl.isPR(notif));
  return (
    <a
      className={classes({ 'notif-list_item': true, 'is-read': !notif.unread })}
      onClick={() => onClick(notif)}
    >
      <div className="notif-list_item-check">
        <i className="fa fa-check"></i>
      </div>
      <div className="notif-list_item-kind">
        <Octicon icon={iconName} className={iconStateClass} />
      </div>
      <div className="notif-list_item-time">
        {notif.updated_at}
      </div>
      <div className="notif-list_item-body">
        <div className="notif-list_item-title">
          {notif.subject.title}
        </div>
      </div>
      <div className="notif-list_item-repo">
        {repoName}
      </div>
    </a>
  );
}
