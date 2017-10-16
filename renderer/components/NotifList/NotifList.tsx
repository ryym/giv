import React from 'react';
import LoadingBars from '../widgets/LoadingBars';
import NotifItem from './NotifItem';
import { Notification, Issue, Repository } from '../../models/types';
import { NotifSelector as NotifSl } from '../../store/selectors';

export type Props = {
  notifs: Notification[],
  getRepository: (fullName: string) => Repository | null,
  getIssue: (url: string) => Issue | null,
  onNotifClick: (notif: Notification) => void,
  isLoading: boolean,
};

export default function NotifList({
  notifs, getRepository, getIssue, onNotifClick, isLoading,
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
            />
          );
        })
      }
      {isLoading && (
        <div className="notif-list_loading">
          <LoadingBars />
        </div>
      )}
    </div>
  );
}
