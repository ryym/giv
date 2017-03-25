import React from 'react';
import { Router, Route } from 'react-router';
import { connectWithReader } from '../redux';
import Layout from './Layout';
import TokenForm from './TokenForm';
import Notifications from './Notifications';
import { push } from '../actions';
import * as paths from '../const/paths';

class Root extends React.Component {
  componentWillReceiveProps({ path, dispatch }) {
    if (this.props.path !== path) {
      dispatch(push(path));
    }
  }

  render() {
    const { props } = this;
    return (
      <Router history={props.history}>
        <Layout>
          <Route exact path={paths.tokenRegistration} component={TokenForm} />
          <Route path={paths.notifications} component={Notifications} />
        </Layout>
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
