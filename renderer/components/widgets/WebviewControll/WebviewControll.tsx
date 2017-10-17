import React from 'react';
import classes from 'classnames';
import WebviewConnector from './webview-connector';

type Props = {
  connector: WebviewConnector,
};

type State = {
  webview: Electron.WebviewTag | null,
};

export default class WebviewControll extends React.PureComponent<Props, State> {
  static createConnector() {
    return new WebviewConnector();
  }

  constructor(props: Props) {
    super(props);
    this.state = { webview: null };
    props.connector.onConnect(this.connectToWebview);
  }

  connectToWebview = (webview: Electron.WebviewTag) => {
    webview.addEventListener('did-finish-load', () => {
      this.forceUpdate();
    });

    webview.addEventListener('did-navigate-in-page', (event: any) => {
      if (webview.src !== event.url) {
        this.forceUpdate();
      }
    });

    webview.addEventListener('dom-ready', () => {
      this.setState({ webview });
    });
  }

  render() {
    const { webview } = this.state;
    if (webview == null) {
      return null;
    }

    return (
      <div className="webview-controll">
        <a
          role="button"
          onClick={() => webview.goBack()}
          className={classes({
            'webview-controll_btn': true,
            'is-disabled': !webview.canGoBack(),
          })}
        >
          ◀
        </a>
        <a
          role="button"
          onClick={() => webview.goForward()}
          className={classes({
            'webview-controll_btn': true,
            'is-disabled': !webview.canGoForward(),
          })}
          >
          ▶
        </a>
      </div>
    );
  }
}
