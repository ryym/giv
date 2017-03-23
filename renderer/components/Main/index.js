import { connectWithReader } from '../../redux';
import React from 'react';

function Main({ token }) {
  return <div>Your token is {token}!</div>;
}

export default connectWithReader(
  ({ userConfig }) => ({
    token: userConfig.accessToken,
  })
)(Main);
