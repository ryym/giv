import React from 'react';
import classes from 'classnames';

export type Props = {
  shownCount: number,
  allCount: number | undefined,
  isLoading: boolean,
  onRefresh: () => void,
};

const renderNotifCount = (shownCount: number, allCount: number | undefined) => {
  return allCount ? `${shownCount} / ${allCount}` : '-';
};

export default function NotifsHeader(props: Props) {
  return (
    <header className="p-notifs_header for-stream">
      <div className="p-notifs_header-items">
        <div className="p-notifs_header-item for-counts">
          {renderNotifCount(props.shownCount, props.allCount)}
        </div>
        <div className="p-notifs_header-item">
          <button
            className="p-notifs_header-action"
            onClick={props.onRefresh}
            disabled={props.isLoading}
          >
            <i className={classes(
              ['fa', 'fa-refresh', 'fa-lg'],
              { 'fa-spin': props.isLoading },
            )}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
