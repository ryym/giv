import React from 'react';

export default function NotifItem({ notif, repo, issue, onClick }) {
  const state = issue ? ` (${issue.state})` : '';
  return (
    <div className="notifs_notif-wrapper">
      <a className="notifs_notif" onClick={() => onClick(notif)}>
        <div className="notifs_notif-body">
          <div className="notifs_notif-title">
            {notif.subject.title + state}
          </div>
          <div className="notifs_notif-repo">
            {repo.full_name}
          </div>
          <time className="notifs_notif-time">
            {notif.updated_at}
          </time>
        </div>
      </a>
    </div>
  );
}
