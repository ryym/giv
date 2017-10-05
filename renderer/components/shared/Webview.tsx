import * as React from 'react';

export type Props = JSX.WebViewAttributes & {
  on: {
    [eventName: string]: (event: Event) => void,
  },
};

export default class Webview extends React.Component<Props, {}> {
  private webview: Electron.WebviewTag | null;

  componentDidMount() {
    const webview = this.webview as Electron.WebviewTag;
    const { on: handlers = {} } = this.props;
    Object.keys(handlers).forEach((eventName) => {
      // XXX: eventName should be union type.
      webview.addEventListener(eventName as any, handlers[eventName]);
    });
  }

  render() {
    const { on, ...props } = this.props;
    return (
      <webview {...props} ref={(el) => (this.webview = el)} />
    );
  }
}
