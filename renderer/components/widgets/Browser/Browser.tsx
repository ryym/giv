import React from 'react';
import Webview from '../Webview';
import WebviewControll from '../WebviewControll';
import WebviewConnector from '../WebviewControll/webview-connector';

export type Props = {
  url?: string,
  onFinishLoad?: (
    event: Event,
    webview: Electron.WebviewTag,
  ) => void,
};

export default class Browser extends React.Component<Props> {
  private connector: WebviewConnector;

  constructor(props: Props) {
    super(props);
    this.connector = WebviewControll.createConnector();
    this.connector.onConnect(this.handleWebviewEvents);
  }

  handleWebviewEvents = (webview: Electron.WebviewTag) => {
    const { onFinishLoad } = this.props;
    webview.addEventListener('did-finish-load', (event: Event) => {
      if (onFinishLoad) {
        onFinishLoad(event, webview);
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
