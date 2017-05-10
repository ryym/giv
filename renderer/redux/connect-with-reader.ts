import { connect, Options } from 'react-redux';
import createReader from '../state/reader';

function createConnectWithReader<R, S>(makeReader: (state: S) => R) {
  return function connectWithReader<OP, RP>(
    mapReaderToProps: (reader: R, props: OP) => RP,
    options: Options = {},
  ) {
    const mapStateToProps = (state: S, props: OP): RP => {
      const reader: R = makeReader(state);
      return mapReaderToProps(reader, props);
    };
    return connect(
      mapStateToProps,
      undefined,
      undefined,
      options,
    );
  };
}

export default createConnectWithReader(createReader);
