import React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import TokenForm from './TokenForm';
import Main from './Main';

function Root({ history, userConfig }) {
  if (!userConfig) {
    return <div>Loading user config..</div>;
  }

  // TODO: Push history via Redux action.
  const token = userConfig.get('accessToken');
  requestAnimationFrame(() => {
    const path = token ? '/notifications' : '/';
    if (history.location.pathname !== path) {
      history.push(path);
    }
  });

  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={TokenForm} />
        <Route path="/notifications" component={Main} />
      </div>
    </Router>
  );
}

export default connect(
  state => ({
    userConfig: state.userConfig,
  })
)(Root);
