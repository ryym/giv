import React from 'react';
import { connect } from 'react-redux';
import { updateToken } from '../../actions';

const TokenForm = (props) => {
  const { token: currentToken, dispatch } = props;
  let token = currentToken;
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(updateToken(token));
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

export default connect(
  state => ({
    token: state.token,
  })
)(TokenForm);
