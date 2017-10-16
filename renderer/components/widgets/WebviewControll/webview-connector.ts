type HandleConnect = (webview: Electron.WebviewTag) => void;

export default class WebviewConnector {
  private webview?: Electron.WebviewTag;
  private handleConnect?: HandleConnect;

  connect(webview: Electron.WebviewTag) {
    if (this.handleConnect) {
      this.handleConnect(webview);
      this.handleConnect = undefined;
    }
    else {
      this.webview = webview;
    }
  }

  // The given handler will be fired only once.
  onConnect(handleConnect: HandleConnect) {
    if (this.webview != null) {
      handleConnect(this.webview);
    }
    else {
      this.handleConnect = handleConnect;
    }
  }
}
