import React from 'react';
import { connect } from 'react-redux';
import State from '../store/state';
import Errors from '../lib/errors';

type CompState = {
  err: Error | null,
};

export type Props = CompState & {
  children?: any,
  onError: (err: Error) => void,
};

export class AppErrorBoundary extends React.PureComponent<Props, CompState> {
  constructor(props: Props) {
    super(props);
    this.state = { err: props.err };
  }

  componentWillReceiveProps(props: Props) {
    if (props.err !== null) {
      this.setState({ err: props.err });
    }
  }

  componentDidCatch(err: Error) {
    this.setState({ err });
  }

  componentDidUpdate() {
    const { err } = this.state;
    if (err) {
      this.props.onError(err);
      this.setState({ err: null });
    }
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  (state: State): Props => ({
    ...state.appError,
    onError: (err: Error) => {
      alert(err.message || 'Unexpected error occurred');
      if (err instanceof Errors) {
        // tslint:disable-next-line:no-console
        console.error('CAUSE: ', err.cause);
      }
    },
  }),
)(AppErrorBoundary);
