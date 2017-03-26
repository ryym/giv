import React from 'react';
import { connectWithReader } from '../../redux';
import NotifItem from './NotifItem';
import { push } from '../../actions';
import './styles.scss';

class Notifications extends React.Component {
  componentDidMount() {
    const { hasAccessToken, dispatch } = this.props;
    if (!hasAccessToken) {
      dispatch(push('/access-token'));
    }
  }

  render() {
    const { notifs = [], getRepository } = this.props;
    return (
      <div className="c_page-root">

        <div className="notifs_header">
          <div className="notifs_tabs">
            <ul>
              <li className="is-active"><a>Unread</a></li>
              <li><a>Read</a></li>
            </ul>
          </div>
        </div>

        <main className="notifs_main">
          <div className="notifs_side">
            <div className="notifs_repos">
              { /* TODO: Show repository names with notification count */ }
            </div>
            <div className="notifs_notifs">
              {notifs.map(nt => (
                <NotifItem key={nt.id} notif={nt} getRepository={getRepository} />
              ))}
            </div>
          </div>

          <div className="notifs_github">
            <webview />
          </div>
        </main>
      </div>
    );
  }
}

export default connectWithReader(
  ({ userConfig, pagination, entities }) => ({
    hasAccessToken: Boolean(userConfig.accessToken),
    notifs: pagination.unreadNotifications,
    getRepository: entities.getRepository,
  })
)(Notifications);
