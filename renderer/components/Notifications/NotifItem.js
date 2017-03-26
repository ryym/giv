import React from 'react';

export default function NotifItem({ notif, getRepository }) {
  const repo = getRepository(notif.repository);
  return (
    <div className="notifs_notif-wrapper">
      <a className="notifs_notif">
        <div className="notifs_notif-body">
          <div className="notifs_notif-title">
            {notif.subject.title}
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
