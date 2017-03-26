import bindMethodContext from '../../lib/utils/bind-method-context';

export default function makeUIReader(uiState) {
  return new UIReader(uiState);
}

class UIReader {
  constructor(uiState) {
    this.ui = uiState;
    bindMethodContext(this);
  }
}
