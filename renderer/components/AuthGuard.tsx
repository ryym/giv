import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../store/types';
import State from '../store/state';
import { getAccessToken } from '../store/selectors';
import { push } from '../store/router/actions';

export type Props = {
  hasAccessToken: boolean,
};
export type WrapperProps = {
  requireToken?: boolean,
  fallbackPath: string,
  children: any,
};
type AllProps = Props & WrapperProps & {
  dispatch: Dispatch,
};

export class AuthGuard extends React.PureComponent<AllProps> {
  constructor(props: AllProps) {
    super(props);
    this.checkAuthentication(props);
  }

  componentWillReceiveProps(nextProps: AllProps) {
    this.checkAuthentication(nextProps);
  }

  checkAuthentication(props: AllProps) {
    if (!this.matchCondition(props)) {
      props.dispatch(push(props.fallbackPath));
    }
  }

  matchCondition(props: AllProps) {
    return Boolean(props.requireToken) === props.hasAccessToken;
  }

  render() {
    const { props } = this;
    return this.matchCondition(props) ? props.children : null;
  }
}

export default connect(
  (state: State): Props => ({
    hasAccessToken: Boolean(getAccessToken(state)),
  }),
)(AuthGuard) as React.ComponentType<WrapperProps>;
