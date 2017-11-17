import React from 'react';
import classes from 'classnames';
import { LoginUser } from '../../lib/models';

export interface Props {
  user: LoginUser;
  open: boolean;
  onCloseClick: () => void;
  onUserClick: () => void;
}

export default function SideMenu({
  user, open, onCloseClick, onUserClick,
}: Props) {
  return (
    <div className={classes('sidemenu_container', {
      'is-open': open,
    })}>
      <div className="sidemenu_mask" onClick={onCloseClick}></div>
      <div className="sidemenu">
        <button className="sidemenu_close" onClick={onCloseClick}>
          <i className="fa fa-times"></i>
        </button>
        <div className="sidemenu_content">
          <div className="sidemenu_user">
            <img className="sidemenu_user-avatar" src={user.avatar_url} />
            <div className="sidemenu_user-names">
              <a className="sidemenu_user-login" role="button" onClick={onUserClick}>
                @{user.login}
              </a>
              <span className="sidemenu_user-name">{user.name}</span>
            </div>
          </div>
          <div className="sidemenu_token-change">
            {/* TODO: Open token update dialog */}
            <a className="sidemenu_token-change-btn">
              Change access token
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
