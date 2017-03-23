import React from 'react';
import { Router, Route } from 'react-router';
import { connectWithReader } from '../redux';
import TokenForm from './TokenForm';
import Main from './Main';
import { push } from '../actions';

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
        <div>
          <Route exact path="/" component={TokenForm} />
          <Route path="/notifications" component={Main} />
        </div>
      </Router>
    );
  }
}

export default connectWithReader(
  ({ userConfig }, { history }) => {
    const path = userConfig.accessToken ? '/notifications' : '/';
    return { history, path };
  }
)(Root);
