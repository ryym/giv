import React from 'react';
import { connect } from 'react-redux';
import State from '../../../store/state';
import { getAccessToken } from '../../../store/selectors';
import { Dispatch } from '../../../store/types';
import { updateToken } from '../../../store/user-config/actions';

export interface Props {
  token: string;
}
type AllProps = Props & { dispatch: Dispatch };

const LoginPage = (props: AllProps) => {
  const { token: currentToken, dispatch } = props;
  let token = currentToken;
  const handleSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    dispatch(updateToken(token));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        defaultValue={token}
        onChange={(event) => {
          token = event.target.value;
        }}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default connect(
  (state: State): Props => ({
    token: getAccessToken(state),
  }),
)(LoginPage);
