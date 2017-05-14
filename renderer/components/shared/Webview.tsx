import * as React from 'react';

export type Props = JSX.WebViewAttributes & {
  on: {
    [eventName: string]: (event: Event) => void,
  },
};

export default class Webview extends React.Component<Props, {}> {
  private webview: Electron.WebViewElement;

  componentDidMount() {
    const { on: handlers = {} } = this.props;
    Object.keys(handlers).forEach((eventName) => {
      this.webview.addEventListener(eventName, handlers[eventName]);
    });
  }

  render() {
    const { on, ...props } = this.props;
    return (
      <webview {...props} ref={(el) => (this.webview = el)} />
    );
  }
}
