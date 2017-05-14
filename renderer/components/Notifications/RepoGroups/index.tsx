import * as React from 'react';
import { NotifCounts as NotifCountMap } from '../../../models/types';
import './styles.scss';

const renderRepos = ({ owner, repos }: NotifCount) => {
  return (
    <li key={owner} className="notif-counts-group">
      <div className="notif-counts-group-name">{owner}</div>
      {repos.map(({ name, count }) => (
        <div key={name} className="notif-counts-item">
          <div className="notif-counts-item-count">{count}</div>
          <span className="notif-counts-item-name">{name}</span>
        </div>
      ))}
    </li>
  );
};

type NotifCount = {
  owner: string,
  repos: Array<{
    name: string,
    count: number,
  }>,
};

const makeCountArray = (nc: NotifCountMap): NotifCount[] => {
  return Object.keys(nc).map((owner) => {
    const repos = Object.keys(nc[owner]).map((name) => ({
      name, count: nc[owner][name],
    })).sort();
    return { owner, repos };
  }).sort();
};

type Props = {
  notifCounts: NotifCountMap,
};

export default function RepoGroups({ notifCounts }: Props) {
  const counts = makeCountArray(notifCounts);
  return (
    <ul className="noitf-counts">
      {counts.map(renderRepos)}
    </ul>
  );
}
