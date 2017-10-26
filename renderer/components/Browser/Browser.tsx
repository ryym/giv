import React from 'react';
import Webview from '../widgets/Webview';
import WebviewControll from '../widgets/WebviewControll';
import WebviewConnector from '../widgets/WebviewControll/webview-connector';

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
      <div className="browser_container">
        <header className="browser_header">
          <WebviewControll connector={this.connector} />
        </header>
        <div className="browser_webview">
          <Webview connector={this.connector} src={this.props.url} />
        </div>
      </div>
    );
  }
}
