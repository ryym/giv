import * as React from 'react';
import { NotifCounts as NotifCountMap } from '../../../models/types';
import './styles.scss';

type NotifCount = {
  owner: string,
  repos: Array<{
    name: string,
    count: number,
  }>,
};

type OnRepoClick = (owner: string, name: string) => void;

type Props = {
  notifCounts: NotifCountMap,
  onRepoClick: OnRepoClick,
  selectedRepo: string,
};

const renderRepos = ({ owner, repos }: NotifCount, { onRepoClick, selectedRepo }: Props) => {
  return (
    <li key={owner} className="notif-counts-group">
      <div className="notif-counts-group-name">{owner}</div>
      {repos.map(({ name, count }) => (
        <a
          key={name}
          className={`notif-counts-item ${selectedRepo === `${owner}/${name}` ? "is-selected" : ""}`}
          onClick={() => onRepoClick(owner, name)}
        >
          <div className="notif-counts-item-count">{count}</div>
          <span className="notif-counts-item-name">{name}</span>
        </a>
      ))}
    </li>
  );
};

const makeCountArray = (nc: NotifCountMap): NotifCount[] => {
  return Object.keys(nc).map((owner) => {
    const repos = Object.keys(nc[owner]).map((name) => ({
      name, count: nc[owner][name],
    })).sort();
    return { owner, repos };
  }).sort();
};

export default function RepoGroups(props: Props) {
  const { notifCounts } = props
  const counts = makeCountArray(notifCounts);
  return (
    <ul className="noitf-counts">
      {counts.map((nc) => renderRepos(nc, props))}
    </ul>
  );
}
