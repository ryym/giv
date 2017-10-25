import React from 'react';
import LoadingBars from '../widgets/LoadingBars';
import NotifItem from './NotifItem';
import { Notification, Issue, Repository } from '../../lib/models';
import { NotifSelector as NotifSl } from '../../store/selectors';

export type Props = {
  notifs: Notification[],
  getRepository: (fullName: string) => Repository | null,
  getIssue: (url: string) => Issue | null,
  onNotifClick: (notif: Notification, event: React.MouseEvent<any>) => void,
  onCheckClick: (notif: Notification) => void,
  onLoadMoreClick: (event: any) => void,
  isLoading: boolean,
};

export default function NotifList({
  notifs, getRepository, getIssue, isLoading,
  onNotifClick, onLoadMoreClick, onCheckClick,
}: Props) {
  return (
    <div className="notif-list">
      {
        notifs.map((notif) => {
          const repo = getRepository(notif.repository)!;
          const issue = getIssue(NotifSl.getIssueURL(notif))!;
          return (
            <NotifItem
              key={notif.id}
              notif={notif}
              repoName={repo.full_name}
              issue={issue}
              onClick={onNotifClick}
              onCheckClick={onCheckClick}
            />
          );
        })
      }
      {!isLoading && (
        <a
          role="button"
          onClick={onLoadMoreClick}
          className="notif-list_load-more"
        >Load more</a>
      )}
      {isLoading && (
        <div className="notif-list_loading">
          <LoadingBars />
        </div>
      )}
    </div>
  );
}
