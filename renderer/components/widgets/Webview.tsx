import React from 'react';
import { WebviewConnector } from './WebviewControll';

export type Props = JSX.WebViewAttributes & {
  connector: WebviewConnector,
  on?: {
    [eventName: string]: (event: Event) => void,
  },
};

export default class Webview extends React.Component<Props> {
  private webview: Electron.WebviewTag | null = null;

  componentDidMount() {
    const webview = this.webview!;
    this.props.connector.connect(webview);

    const { on: handlers = {} } = this.props;
    Object.keys(handlers).forEach((eventName) => {
      // XXX: eventName should be union type.
      webview.addEventListener(eventName as any, handlers[eventName]);
    });
  }

  render() {
    const { on, connector, ...props } = this.props;
    return (
      <webview {...props} ref={(el) => (this.webview = el)} />
    );
  }
}
