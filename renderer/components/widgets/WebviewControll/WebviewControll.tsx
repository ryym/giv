import React from 'react';
import classes from 'classnames';
import WebviewConnector from './webview-connector';
import ControllButton from './ControllButton';

type Props = {
  connector: WebviewConnector,
};

type State = {
  webview: Electron.WebviewTag | null,
  nowLoading: boolean,
  url: string | null,
};

export default class WebviewControll extends React.PureComponent<Props, State> {
  static createConnector() {
    return new WebviewConnector();
  }

  private urlBar: HTMLInputElement | null;

  constructor(props: Props) {
    super(props);
    this.state = { webview: null, nowLoading: false, url: null };
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

    webview.addEventListener('load-commit', (event: any) => {
      if (event.isMainFrame) {
        this.setState({ url: event.url });
      }
    });

    webview.addEventListener('did-navigate-in-page', stopLoading);
    webview.addEventListener('dom-ready', stopLoading);
  }

  selectWholeURL = () => {
    this.urlBar!.select();
  }

  render() {
    const { webview, nowLoading } = this.state;
    return (
      <div className="w_webview-controll">
        <ControllButton
          action={() => webview && webview.goBack()}
          enabled={webview && webview.canGoBack()}
        >
          ◀
        </ControllButton>
        <ControllButton
          action={() => webview && webview.goForward()}
          enabled={webview && webview.canGoForward()}
        >
          ▶
        </ControllButton>
        <ControllButton
          action={() => webview && !nowLoading && webview.reload()}
          enabled={webview || nowLoading}
        >
          <i className={classes(
            ['fa', 'fa-refresh', 'fa-lg'],
            { 'fa-spin': nowLoading },
          )}></i>
        </ControllButton>
        {this.renderURLBar()}
      </div>
    );
  }

  renderURLBar() {
    const { url } = this.state;
    return (
      <input
        type="text"
        readOnly
        value={url || ''}
        className="w_webview-controll_url"
        ref={(urlBar: HTMLInputElement) => this.urlBar = urlBar}
        onClick={this.selectWholeURL}
      />
    );
  }
}
