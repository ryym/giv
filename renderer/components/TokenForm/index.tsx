import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../state/reducer';
import { getAccessToken } from '../../state/selectors';
import { DispatchProps } from '../../redux/react';
import { UpdateToken } from '../../actions';

export interface Props {
  token: string;
}
type AllProps = Props & DispatchProps;

const TokenForm = (props: AllProps) => {
  const { token: currentToken, dispatch } = props;
  let token = currentToken;
  const handleSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    dispatch(UpdateToken(token));
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
)(TokenForm);
