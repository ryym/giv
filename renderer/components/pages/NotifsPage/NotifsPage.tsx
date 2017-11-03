import React from 'react';
import classes from 'classnames';
import NotifList from '../../NotifList';
import RepoTree from '../../RepoTree';
import Browser from '../../widgets/Browser';
import NotifsHeader from './NotifsHeader';
import { Notification, Issue, Repository, NotifCounts } from '../../../lib/models';
import { Dispatch } from '../../../store/types';
import {
  selectNotif, openNotifExternal,
  filterNotifs,
  pollNotifications,
  fetchUnreadNotifs,
  FetchUnreadNotifsPayload,
  markAsRead,
  refreshNotifs,
} from '../../../store/notifications/actions';
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
} from '../../../store/selectors';

export type Props = {
  notifs: Notification[],
  getRepository: (fullName: string) => Repository | null,
  getIssue: (url: string) => Issue | null,
  shownURL: string | undefined,
  isLoading: boolean,
  notifCounts: NotifCounts,
  selectedRepo: string,
  allUnreadCount: number | undefined,
};
type AllProps = Props & { dispatch: Dispatch };

export class NotifsPage extends React.PureComponent<AllProps> {
  componentWillMount() {
    const { notifs, dispatch } = this.props;
    if (notifs.length === 0) {
      dispatch(pollNotifications());
    }
  }

  showNotification = (notif: Notification, event: React.MouseEvent<any>) => {
    if (event.metaKey || event.ctrlKey) {
      this.props.dispatch(openNotifExternal(notif));
    }
    else {
      this.props.dispatch(selectNotif(notif));
    }
  }

  changeNotifFilter = (owner: string, repo: string) => {
    const fullName = `${owner}/${repo}`;
    this.props.dispatch(filterNotifs({ fullName }));
  }

  loadNotifsMore = () => {
    const { notifs, selectedRepo, dispatch } = this.props;

    const payload: FetchUnreadNotifsPayload = { repoFullName: selectedRepo };
    if (notifs.length > 0) {
      const oldestNotif = notifs[notifs.length - 1];
      payload.oldestUpdatedAt = oldestNotif.updated_at;
    }

    dispatch(fetchUnreadNotifs(payload));
  }

  markAsRead = (notif: Notification) => {
    this.props.dispatch(markAsRead(notif));
  }

  refreshNotifs = () => {
    if (!this.props.isLoading) {
      this.props.dispatch(refreshNotifs());
    }
  }

  render() {
    const { props } = this;
    return (
      <div className="c_page-root p-notifs_root">
        <section className="p-notifs_streams-container">
          <NotifsHeader
            shownCount={props.notifs.length}
            allCount={props.allUnreadCount}
            isLoading={props.isLoading}
            onRefresh={this.refreshNotifs}
          />
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
              onCheckClick={this.markAsRead}
              onLoadMoreClick={this.loadNotifsMore}
              isLoading={props.isLoading}
            />
          </div>
        </section>
        <section className="p-notifs_webview-container">
          <Browser url={props.shownURL} />
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
      allUnreadCount: state.notifications.allUnreadCount,
    };
  },
)(NotifsPage);
