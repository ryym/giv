import React from 'react';

export default class Webview extends React.Component {
  componentDidMount() {
    const { on: handlers = {} } = this.props;
    Object.keys(handlers).forEach(eventName => {
      this.webview.addEventListener(eventName, handlers[eventName]);
    });
  }

  render() {
    const { on, ...props } = this.props;
    return (
      <webview {...props} ref={el => (this.webview = el)} />
    );
  }
}
