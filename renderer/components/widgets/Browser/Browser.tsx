import React from 'react';
import Webview from '../Webview';
import WebviewControll from '../WebviewControll';
import WebviewConnector from '../WebviewControll/webview-connector';

export type Props = {
  url?: string,
  onURLChange?: (event: Electron.LoadCommitEvent) => void,
};

export default class Browser extends React.Component<Props> {
  private connector: WebviewConnector;

  constructor(props: Props) {
    super(props);
    this.connector = WebviewControll.createConnector();
    this.connector.onConnect(this.handleWebviewEvents);
  }

  handleWebviewEvents = (webview: Electron.WebviewTag) => {
    const { onURLChange } = this.props;
    webview.addEventListener('load-commit', (event: Electron.LoadCommitEvent) => {
      if (event.isMainFrame && onURLChange != null) {
        onURLChange(event);
      }
    });
  }

  render() {
    return (
      <div className="w_browser_container">
        <header className="w_browser_header">
          <WebviewControll connector={this.connector} />
        </header>
        <div className="w_browser_webview">
          <Webview connector={this.connector} src={this.props.url} />
        </div>
      </div>
    );
  }
}
