import React from 'react';
import { connectWithReader } from '../../redux';
import { UpdateToken } from '../../actions';

const TokenForm = (props) => {
  const { token: currentToken, dispatch } = props;
  let token = currentToken;
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(UpdateToken(token));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        defaultValue={token}
        onChange={event => {
          token = event.target.value;
        }}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default connectWithReader(
  ({ userConfig }) => ({
    token: userConfig.accessToken,
  })
)(TokenForm);
