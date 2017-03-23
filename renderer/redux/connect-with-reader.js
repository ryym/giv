import { connect } from 'react-redux';
import createReader from '../state/reader';

export default function connectWithReader(
  mapReaderToProps,
  mapDispatchToProps,
  mergeProps,
  options
) {
  const mapStateToProps = (state, props) => {
    const reader = createReader(state);
    return mapReaderToProps(reader, props);
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  );
}
