import React from 'react';
import { Router, Route } from 'react-router';
import { connectWithReader } from '../redux';
import TokenForm from './TokenForm';
import Notifications from './Notifications';
import { Push } from '../actions';
import * as paths from '../const/paths';

class Root extends React.Component {
  componentWillReceiveProps({ path, dispatch }) {
    if (this.props.path !== path) {
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
  ({ userConfig }, { history }) => {
    const path = userConfig.accessToken ? paths.notifications : paths.tokenRegistration;
    return { history, path };
  }
)(Root);
