import React from 'react';
import Icon from '../../widgets/Icon';
import classes from 'classnames';

export type Props = {
  shownCount: number,
  allCount: number | undefined,
  isLoading: boolean,
  onSideMenuOpen: () => void,
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
        <div className="p-notifs_header-item is-menu">
          <button
            title="Open side menu"
            className="p-notifs_header-action"
            onClick={props.onSideMenuOpen}
          >
            <Icon id="bars" opts="lg" />
          </button>
        </div>
        <div className="p-notifs_header-item is-counts">
          {renderNotifCount(props.shownCount, allCount)}
        </div>
        <div className="p-notifs_header-item">
          <button
            title="Mark all as read"
            className="p-notifs_header-action"
            onClick={confirmAndMarkAllAsRead}
            disabled={!allCount || props.isLoading}
          >
            <Icon id="check" opts="lg" />
          </button>
        </div>
        <div className="p-notifs_header-item">
          <button
            title="Reload notifications"
            className="p-notifs_header-action"
            onClick={props.onRefresh}
            disabled={props.isLoading}
          >
            <Icon id="refresh" opts={classes({
              lg: true,
              spin: props.isLoading,
            })} />
          </button>
        </div>
      </div>
    </header>
  );
}
