import React from 'react';
import classes from 'classnames';
import WebviewConnector from './webview-connector';

type Props = {
  connector: WebviewConnector,
};

type State = {
  webview: Electron.WebviewTag | null,
  nowLoading: boolean,
};

export default class WebviewControll extends React.PureComponent<Props, State> {
  static createConnector() {
    return new WebviewConnector();
  }

  constructor(props: Props) {
    super(props);
    this.state = { webview: null, nowLoading: false };
    props.connector.onConnect(this.connectToWebview);
  }

  connectToWebview = (webview: Electron.WebviewTag) => {
    const setWebview = () => {
      this.setState({ webview });
      webview.removeEventListener('dom-ready', setWebview);
    };
    webview.addEventListener('dom-ready', setWebview);

    webview.addEventListener('did-start-loading', () => {
      this.setState({ nowLoading: true });
    });

    const stopLoading = () => {
      if (this.state.nowLoading) {
        this.setState({ nowLoading: false });
      }
    };
    webview.addEventListener('did-navigate-in-page', stopLoading);
    webview.addEventListener('dom-ready', stopLoading);
  }

  render() {
    const { webview, nowLoading } = this.state;
    return (
      <div className="webview-controll">
        <a
          role="button"
          onClick={() => webview && webview.goBack()}
          className={classes({
            'webview-controll_btn': true,
            'is-disabled': !webview || !webview.canGoBack(),
          })}
        >
          ◀
        </a>
        <a
          role="button"
          onClick={() => webview && webview.goForward()}
          className={classes({
            'webview-controll_btn': true,
            'is-disabled': !webview || !webview.canGoForward(),
          })}
          >
          ▶
        </a>
        <a
          role="button"
          onClick={() => webview && webview.reload()}
          className={classes({
            'webview-controll_btn': true,
            'is-disabled': !webview && !nowLoading,
          })}
          >
          <i className={classes(
            ['fa', 'fa-refresh', 'fa-lg'],
            { 'fa-spin': nowLoading },
          )}></i>
        </a>
      </div>
    );
  }
}
