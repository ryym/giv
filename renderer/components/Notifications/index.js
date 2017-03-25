import React from 'react';
import { connectWithReader } from '../../redux';
import { push } from '../../actions';

class Notifications extends React.Component {
  componentDidMount() {
    const { hasAccessToken, dispatch } = this.props;
    if (!hasAccessToken) {
      dispatch(push('/access-token'));
    }
  }

  render() {
    const { notifs = [] } = this.props;
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
  }
}

export default connectWithReader(
  ({ userConfig, pagination }) => ({
    hasAccessToken: Boolean(userConfig.accessToken),
    notifs: pagination.unreadNotifications,
  })
)(Notifications);
