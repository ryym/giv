import React from 'react';
import classes from 'classnames';

export type Props = {
  shownCount: number,
  allCount: number | undefined,
  isLoading: boolean,
  onRefresh: () => void,
  onMarkAllAsRead: () => void,
};

const renderNotifCount = (shownCount: number, allCount: number | undefined) => {
  return allCount != null ? `${shownCount} / ${allCount}` : '-';
};

export default function NotifsHeader(props: Props) {
  const { allCount } = props;

  const confirmAndMarkAllAsRead = () => {
    if (!allCount) {
      return;
    }
    const notifs = allCount === 1 ? '1 notification' : `*ALL* ${allCount} notifications`;
    if (confirm(`Mark ${notifs} as read?`)) {
      props.onMarkAllAsRead();
    }
  };

  return (
    <header className="p-notifs_header for-stream">
      <div className="p-notifs_header-items">
        <div className="p-notifs_header-item for-counts">
          {renderNotifCount(props.shownCount, allCount)}
        </div>
        <div className="p-notifs_header-item">
          <button
            className="p-notifs_header-action"
            onClick={confirmAndMarkAllAsRead}
            disabled={!allCount || props.isLoading}
          >
            <i className="fa fa-check fa-lg"></i>
          </button>
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
