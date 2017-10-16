import React from 'react';
import NotifList from '../../NotifList';
import RepoTree from '../../RepoTree';
import Webview from '../../widgets/Webview';
import WebviewControll from '../../widgets/WebviewControll';
import { Notification, Issue, Repository, NotifCounts } from '../../../models/types';
import { Dispatch } from '../../../store/types';
import { selectNotif, filterNotifs, fetchUnreadNotifs } from '../../../store/notifications/actions';
import { connect } from 'react-redux';
import State from '../../../store/state';
import {
  getFilteredNotifs,
  getSelectedRepo,
  getShownNotificationURL,
  isLoadingNotifs,
  getRepository,
  getIssue,
  countNotifsPerRepo,
  NotifSelector as NotifSl,
} from '../../../store/selectors';

export type Props = {
  notifs: Notification[],
  getRepository: (fullName: string) => Repository | null,
  getIssue: (url: string) => Issue | null,
  shownURL: string | undefined,
  isLoading: boolean,
  notifCounts: NotifCounts,
  selectedRepo: string,
};
type AllProps = Props & { dispatch: Dispatch };

export class NotifsPage extends React.PureComponent<AllProps> {
  componentWillMount() {
    const { notifs, dispatch } = this.props;
    if (notifs.length === 0) {
      dispatch(fetchUnreadNotifs());
    }
  }

  showNotification = (notif: Notification) => {
    this.props.dispatch(selectNotif(notif));
  }

  changeNotifFilter = (owner: string, repo: string) => {
    const fullName = `${owner}/${repo}`;
    this.props.dispatch(filterNotifs({ fullName }));
  }

  render() {
    const { props } = this;
    const webviewConnector = WebviewControll.createConnector();
    return (
      <div className="c_page-root p-notifs_root">
        <section className="p-notifs_streams-container">
          <header className="p-notifs_header for-stream" />
          <div className="p-notifs_streams">
            <RepoTree
              notifCounts={props.notifCounts}
              onRepoClick={this.changeNotifFilter}
              selectedRepo={props.selectedRepo}
            />
            <NotifList
              notifs={props.notifs}
              getRepository={props.getRepository}
              getIssue={props.getIssue}
              onNotifClick={this.showNotification}
              isLoading={props.isLoading}
            />
          </div>
        </section>
        <section className="p-notifs_webview-container">
          <header className="p-notifs_header for-webview">
            <WebviewControll connector={webviewConnector} />
          </header>
          <div className="p-notifs_webview">
            <Webview connector={webviewConnector} src={props.shownURL} />
          </div>
        </section>
      </div>
    );
  }
}

export default connect(
  (state: State) => {
    return {
      notifs: getFilteredNotifs(state),
      getRepository: (fullName: string) => getRepository(state, fullName),
      getIssue: (url: string) => getIssue(state, url),
      shownURL: getShownNotificationURL(state),
      isLoading: isLoadingNotifs(state),
      notifCounts: countNotifsPerRepo(state),
      selectedRepo: getSelectedRepo(state),
    };
  },
)(NotifsPage);
