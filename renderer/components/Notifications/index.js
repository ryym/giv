import React from 'react';
import { connectWithReader } from '../../redux';
import NotifItem from './NotifItem';
import {
  push,
  selectNotif,
  fetchNotifs,
} from '../../actions';
import { NotifReader as NotifR } from '../../state/entities/reader';
import './styles.scss';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      atScrollEnd: false,
    };

    this.showNotification = this.showNotification.bind(this);
    this.loadOnScrollEnd = this.loadOnScrollEnd.bind(this);
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

  loadOnScrollEnd(event) {
    if (this.props.isLoading) {
      return;
    }
    const t = event.target;
    const nowAtScrollEnd = t.scrollTop === t.scrollHeight - t.clientHeight;
    const { atScrollEnd } = this.state;

    if (nowAtScrollEnd && !atScrollEnd) {
      const { notifs, dispatch } = this.props;
      const oldestNotif = notifs[notifs.length - 1];
      dispatch(fetchNotifs(oldestNotif.updated_at));
      this.setState({ atScrollEnd: true });
    }
    else if (atScrollEnd) {
      this.setState({ atScrollEnd: false });
    }
  }

  renderNotif(notif) {
    const { props } = this;
    const repo = props.getRepository(notif.repository);
    const issue = props.getIssue(NotifR.getIssueURL(notif));
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
    const { notifs = [], shownURL, isLoading } = this.props;

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
            <div className="notifs_notifs" onScroll={this.loadOnScrollEnd}>
              {notifs.map(this.renderNotif)}
              {isLoading && (
                <div>now loading..</div>
              )}
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
    isLoading: ui.isLoadingNotifs,
  })
)(Notifications);
