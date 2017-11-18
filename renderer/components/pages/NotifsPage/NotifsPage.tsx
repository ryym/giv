import React from 'react';
import NotifList from '../../NotifList';
import RepoTree from '../../RepoTree';
import Browser from '../../widgets/Browser';
import NotifsHeader from './NotifsHeader';
import SideMenu from '../../SideMenu';
import {
  Notification,
  Issue,
  Repository,
  NotifCounts,
  LoginUser,
} from '../../../lib/models';
import { Dispatch } from '../../../store/types';
import {
  selectNotif,
  openNotifExternal,
  filterNotifs,
  pollNotifications,
  fetchUnreadNotifs,
  FetchUnreadNotifsPayload,
  markAsRead,
  markAllAsRead,
  refreshNotifs,
} from '../../../store/notifications/actions';
import { logout } from '../../../store/login/actions';
import { openInExternalBrowser } from '../../../store/ext/actions';
import { connect } from 'react-redux';
import State from '../../../store/state';
import {
  getLoginUser,
  getFilteredNotifs,
  getSelectedRepo,
  getShownNotificationURL,
  isLoadingNotifs,
  getRepository,
  getIssue,
  countNotifsPerRepo,
} from '../../../store/selectors';

export type Props = {
  user: LoginUser,
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

type PageState = {
  sideMenuOpen: boolean,
};

export class NotifsPage extends React.PureComponent<AllProps, PageState> {
  state: PageState = {
    sideMenuOpen: false,
  };

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

  markAllAsRead = () => {
    if (!this.props.isLoading) {
      this.props.dispatch(markAllAsRead());
    }
  }

  openSideMenu = () => this.setState({ sideMenuOpen: true });
  closeSideMenu = () => this.setState({ sideMenuOpen: false });

  openUserPage = () => {
    const { dispatch, user } = this.props;
    dispatch(openInExternalBrowser(user.html_url));
  }

  logout = () => {
    this.props.dispatch(logout());
  }

  render() {
    const { props, state } = this;
    return (
      <div className="c_page-root p-notifs_root">
        <section className="p-notifs_streams-container">
          <NotifsHeader
            shownCount={props.notifs.length}
            allCount={props.allUnreadCount}
            isLoading={props.isLoading}
            onSideMenuOpen={this.openSideMenu}
            onRefresh={this.refreshNotifs}
            onMarkAllAsRead={this.markAllAsRead}
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
        <SideMenu
          user={props.user}
          open={state.sideMenuOpen}
          onCloseClick={this.closeSideMenu}
          onUserClick={this.openUserPage}
          onLogout={this.logout}
        />
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
      user: getLoginUser(state)!,
    };
  },
)(NotifsPage);
