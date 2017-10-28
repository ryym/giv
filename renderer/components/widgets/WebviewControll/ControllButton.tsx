import React from 'react';
import classes from 'classnames';

export type Props = {
  children: any,
  action: () => any,
  enabled: any,
};

export default function ControllButton({ children, action, enabled }: Props) {
  return (
    <a
      role="button"
      onClick={action}
      className={classes({ 'w_webview-controll_btn': true, 'is-disabled': !enabled })}
    >
      {children}
    </a>
  );
}
