type HandleConnect = (webview: Electron.WebviewTag) => void;

export default class WebviewConnector {
  private webview?: Electron.WebviewTag;
  private handlers: HandleConnect[] = [];

  connect(webview: Electron.WebviewTag) {
    this.webview = webview;
    this.handlers.forEach((handle) => handle(webview));
    this.handlers = [];
  }

  // The given handler will be fired only once.
  onConnect(handleConnect: HandleConnect) {
    if (this.webview != null) {
      handleConnect(this.webview);
    }
    else {
      this.handlers.push(handleConnect);
    }
  }
}
