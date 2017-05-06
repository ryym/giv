import bindMethodContext from '../../lib/utils/bind-method-context';
import { UIState } from './reducer'

export default function makeUIReader(uiState: UIState) {
  return new UIReader(uiState);
}

export class UIReader {
  private readonly ui: UIState

  constructor(uiState: UIState) {
    this.ui = uiState;
    bindMethodContext(this);
  }

  get isLoadingNotifs(): boolean {
    return this.ui.notifications.isLoading;
  }

  get shownNotificationURL(): string | undefined {
    return this.ui.notifications.shownURL;
  }
}
