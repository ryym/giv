import React from 'react';
import { connectWithReader } from '../../redux';

const Notifications = ({ notifs = [] }) => {
  return (
    <div>
      <h1>notifications</h1>
      {
        notifs.map(nt => (
          <div key={nt.id}>{nt.subject.title}</div>
        ))
      }
    </div>
  );
};

export default connectWithReader(
  ({ pagination }) => ({
    notifs: pagination.unreadNotifications,
  })
)(Notifications);
