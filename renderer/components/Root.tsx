import * as React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import State from '../store/state';
import { getAccessToken } from '../store/selectors';
import TokenForm from './TokenForm';
import Notifications from './Notifications';
import * as paths from '../const/paths';
import { History } from 'history';
import { Dispatch } from '../store/types';
import { push } from '../store/router/actions';

export type Props = {
  path?: string,
  history: History,
};
type AllProps = { dispatch: Dispatch } & Props;

type WrapperProps = {
  history: History,
};

class Root extends React.Component<AllProps, {}> {
  componentWillReceiveProps({ path, dispatch }: AllProps) {
    if (path && this.props.path !== path) {
      dispatch(push(path));
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

export default connect(
  (state: State, { history }: WrapperProps): Props => {
    const token = getAccessToken(state);
    const path = token ? paths.notifications : paths.tokenRegistration;
    return { history, path };
  },
)(Root);
