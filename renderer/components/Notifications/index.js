import React from 'react';
import { connectWithReader } from '../../redux';
import NotifItem from './NotifItem';
import { push, selectNotif } from '../../actions';
import './styles.scss';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.renderNotif = this.renderNotif.bind(this);
  }

  componentDidMount() {
    const { hasAccessToken, dispatch } = this.props;
    if (!hasAccessToken) {
      dispatch(push('/access-token'));
    }
  }

  showNotification(notif) {
    this.props.dispatch(selectNotif(notif));
  }

  renderNotif(notif) {
    const { props } = this;
    const repo = props.getRepository(notif.repository);
    const issue = props.getIssue(notif.subject.url);
    return (
      <NotifItem
        key={notif.id}
        notif={notif}
        repo={repo}
        issue={issue}
        onClick={this.showNotification}
      />
    );
  }

  render() {
    const { notifs = [], shownURL } = this.props;

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
              {notifs.map(this.renderNotif)}
            </div>
          </div>

          <div className="notifs_github">
            <webview src={shownURL} />
          </div>
        </main>
      </div>
    );
  }
}

export default connectWithReader(
  ({ userConfig, pagination, entities, ui }) => ({
    hasAccessToken: Boolean(userConfig.accessToken),
    notifs: pagination.unreadNotifications,
    getRepository: entities.getRepository,
    getIssue: entities.getIssue,
    shownURL: ui.shownNotificationURL,
  })
)(Notifications);
