import React from 'react';
import Webview from '../Webview';
import WebviewControll from '../WebviewControll';
import WebviewConnector from '../WebviewControll/webview-connector';

export type Props = {
  url?: string,
};

export default class Browser extends React.Component<Props> {
  private connector: WebviewConnector;

  constructor(props: Props) {
    super(props);
    this.connector = WebviewControll.createConnector();
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
