import React from 'react';
import classes from 'classnames';

export type Props = {
  name: string,
  count: number,
  selected: boolean,
  onClick: () => void,
};

export default function Repo({ name, count, selected, onClick }: Props) {
  return (
    <a
      role="button"
      key={name}
      className={classes({ 'repo-tree_repo': true, 'is-selected': selected })}
      onClick={onClick}
    >
      <div className="repo-tree_repo-name">{name}</div>
      <div className="repo-tree_notif-count">{count}</div>
    </a>
  );
}
