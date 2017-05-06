import * as React from 'react';
import { Router, Route } from 'react-router';
import { connectWithReader } from '../redux';
import TokenForm from './TokenForm';
import Notifications from './Notifications';
import { Push } from '../actions';
import * as paths from '../const/paths';
import { History } from 'history'
import { DispatchProps } from '../redux/react'

export type Props = {
  path?: string,
  history: History,
}
type AllProps = DispatchProps & Props

type WrapperProps = {
  history: History,
}

class Root extends React.Component<AllProps, {}> {
  componentWillReceiveProps({ path, dispatch }: AllProps) {
    if (path && this.props.path !== path) {
      dispatch(Push(path));
    }
  }

  render() {
    const { props } = this;
    return (
      <Router history={props.history}>
        <div className="c_route-container">
          <Route exact path={paths.notifications} component={Notifications} />
          <Route path={paths.tokenRegistration} component={TokenForm} />
        </div>
      </Router>
    );
  }
}

export default connectWithReader(
  ({ userConfig }, { history }: WrapperProps): Props => {
    const path = userConfig.accessToken ? paths.notifications : paths.tokenRegistration;
    return { history, path };
  }
)(Root);
