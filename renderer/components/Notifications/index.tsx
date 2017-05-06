import * as React from 'react';
import { connectWithReader } from '../../redux';
import { DispatchProps } from '../../redux/react';
import Webview from '../shared/Webview';
import LoadingBars from '../shared/LoadingBars';
import NotifItem from './NotifItem';
import {
  Push,
  SelectNotif,
  FetchNotifs,
} from '../../actions';
import { NotifReader as NotifR } from '../../state/entities/reader';
import { Notification, Issue, Repository } from '../../models/types'
import './styles.scss';

export type Props = {
  hasAccessToken: boolean,
  notifs: Notification[],
  getRepository: (fullName: string) => Repository | null,
  getIssue: (url: string) => Issue | null,
  shownURL: string | undefined,
  isLoading: boolean,
}
type AllProps = Props & DispatchProps

type State = {
  atScrollEnd: boolean,
  nowViewLoading: boolean
}

class Notifications extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      atScrollEnd: false,
      nowViewLoading: false,
    };

    this.showNotification = this.showNotification.bind(this);
    this.loadOnScrollEnd = this.loadOnScrollEnd.bind(this);
    this.renderNotif = this.renderNotif.bind(this);
  }

  componentDidMount() {
    const { hasAccessToken, dispatch } = this.props;
    if (!hasAccessToken) {
      dispatch(Push('/access-token'));
    }
  }

  showNotification(notif: Notification) {
    this.props.dispatch(SelectNotif(notif));
  }

  loadOnScrollEnd(event: React.UIEvent<Element>) {
    if (this.props.isLoading) {
      return;
    }
    const t = event.target as Element;
    const nowAtScrollEnd = t.scrollTop === t.scrollHeight - t.clientHeight;
    const { atScrollEnd } = this.state;

    if (nowAtScrollEnd && !atScrollEnd) {
      const { notifs, dispatch } = this.props;
      const oldestNotif = notifs[notifs.length - 1];
      dispatch(FetchNotifs(oldestNotif.updated_at));
      this.setState({ atScrollEnd: true });
    }
    else if (atScrollEnd) {
      this.setState({ atScrollEnd: false });
    }
  }

  renderNotif(notif: Notification) {
    const { props } = this;
    const repo = props.getRepository(notif.repository)!;
    const issue = props.getIssue(NotifR.getIssueURL(notif))!;
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
                <div className="notifs_notif-loading">
                  <LoadingBars />
                </div>
              )}
            </div>
          </div>

          <div className="notifs_github">
            <Webview src={shownURL} on={{
              'did-start-loading': () => {
                this.setState({ nowViewLoading: true });
              },
              'dom-ready': () => {
                this.setState({ nowViewLoading: false });
              },
            }}
            />
            {this.state.nowViewLoading && (
            <div className="notifs_view-mask">
              <LoadingBars />
            </div>
          )}
          </div>
        </main>
      </div>
    );
  }
}

export default connectWithReader(
  ({ userConfig, pagination, entities, ui }): Props => ({
    hasAccessToken: Boolean(userConfig.accessToken),
    notifs: pagination.unreadNotifications,
    getRepository: entities.getRepository,
    getIssue: entities.getIssue,
    shownURL: ui.shownNotificationURL,
    isLoading: ui.isLoadingNotifs,
  })
)(Notifications);
