import { connect } from 'react-redux';
import React from 'react';

function Main({ notifications }) {
  return <div>There are {notifications.length} notifications!</div>;
}

export default connect(
  state => state
)(Main);
