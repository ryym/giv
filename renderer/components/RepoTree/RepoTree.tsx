import React from 'react';
import Repo from './Repo';
import { NotifCounts } from '../../lib/models';

export type NotifCount = {
  owner: string,
  repos: Array<{
    name: string,
    count: number,
  }>,
};

export type OnRepoClick = (owner: string, name: string) => void;

export type Props = {
  notifCounts: NotifCounts,
  onRepoClick: OnRepoClick,
  selectedRepo: string,
};

export default function RepoTree(props: Props) {
  const counts = makeCountArray(props.notifCounts);
  return (
    <div className="repo-tree">
      <ul className="repo-tree_orgs">
        {
          counts.map(({ owner, repos }) => {
            return (
              <li key={owner}>
                <div className="repo-tree_org-name">
                  {owner}
                </div>
                {renderRepos({ owner, repos }, props)}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const renderRepos = ({ owner, repos }: NotifCount, { selectedRepo, onRepoClick }: Props) => {
  return (
    <ul className="repo-tree_repos">
      {repos.map(({ name, count }) => {
        return (
          <Repo
            key={name}
            name={name}
            count={count}
            selected={selectedRepo === `${owner}/${name}`}
            onClick={() => onRepoClick(owner, name)}
          />
        );
      })}
    </ul>
  );
};

const makeCountArray = (nc: NotifCounts): NotifCount[] => {
  return Object.keys(nc).map((owner) => {
    const repos = Object.keys(nc[owner]).map((name) => ({
      name, count: nc[owner][name],
    })).sort();
    return { owner, repos };
  }).sort();
};
