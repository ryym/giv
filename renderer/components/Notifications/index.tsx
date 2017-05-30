import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../state/reducer';
import {
  getAccessToken,
  getFilteredNotifs,
  getShownNotificationURL,
  isLoadingNotifs,
  getRepository,
  getIssue,
  countNotifsPerRepo,
  NotifSelector as NotifSl,
} from '../../state/selectors';
import { DispatchProps } from '../../redux/react';
import Webview from '../shared/Webview';
import LoadingBars from '../shared/LoadingBars';
import NotifItem from './NotifItem';
import RepoGroups from './RepoGroups';
import {
  Push,
  SelectNotif,
  FetchNotifs,
  FilterNotifs,
} from '../../actions';
import {
  Notification,
  Issue,
  Repository,
  NotifCounts,
} from '../../models/types';
import './styles.scss';

export type Props = {
  hasAccessToken: boolean,
  notifs: Notification[],
  getRepository: (fullName: string) => Repository | null,
  getIssue: (url: string) => Issue | null,
  shownURL: string | undefined,
  isLoading: boolean,
  notifCounts: NotifCounts,
};
type AllProps = Props & DispatchProps;

type ComponentState = {
  atScrollEnd: boolean,
  nowViewLoading: boolean,
};

class Notifications extends React.Component<AllProps, ComponentState> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      atScrollEnd: false,
      nowViewLoading: false,
    };

    this.showNotification = this.showNotification.bind(this);
    this.changeNotifFilter = this.changeNotifFilter.bind(this);
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

  changeNotifFilter(owner: string, repo: string) {
    const fullName = `${owner}/${repo}`;
    this.props.dispatch(FilterNotifs({ fullName }));
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
    const issue = props.getIssue(NotifSl.getIssueURL(notif))!;
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
    const { notifs = [], shownURL, isLoading, notifCounts } = this.props;

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
              <RepoGroups
                notifCounts={notifCounts}
                onRepoClick={this.changeNotifFilter}
              />
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

export default connect(
  (state: State): Props => ({
    hasAccessToken: Boolean(getAccessToken(state)),
    notifs: getFilteredNotifs(state),
    getRepository: (fullName: string) => getRepository(state, fullName),
    getIssue: (url: string) => getIssue(state, url),
    shownURL: getShownNotificationURL(state),
    isLoading: isLoadingNotifs(state),
    notifCounts: countNotifsPerRepo(state),
  }),
)(Notifications);
