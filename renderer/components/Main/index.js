import { connect } from 'react-redux';
import React from 'react';

function Main({ token }) {
  return <div>Your token is {token}!</div>;
}

export default connect(
  state => ({
    token: state.userConfig.get('accessToken'),
  })
)(Main);
