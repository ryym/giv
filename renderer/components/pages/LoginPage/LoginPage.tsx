import React from 'react';
import classes from 'classnames';
import { connect } from 'react-redux';
import StoreState from '../../../store/state';
import { getAccessToken } from '../../../store/selectors';
import { Dispatch } from '../../../store/types';
import { updateToken } from '../../../store/user-config/actions';
import LoginSteps, { STEP } from '../../LoginSteps';
import Browser from '../../widgets/Browser';
import Dialog from '../../widgets/Dialog'
import './login-page.scss';

type AllProps = { dispatch: Dispatch };

type State = {
  url: string,
  step: number,
  token: string,
};

const GITHUB_URL = Object.freeze({
  HOME: 'https://github.com/',
  LOGIN: 'https://github.com/login',
  TOKENS: 'https://github.com/settings/tokens',
  NEW_TOKEN: 'https://github.com/settings/tokens/new',
});

export class LoginPage extends React.Component<AllProps, State> {
  state: State = {
    url: GITHUB_URL.LOGIN,
    step: STEP.LOADING,
    token: '',
  };

  updateStepsByGitHubURL = async (event: Event, webview: Electron.WebviewTag) => {
    const url = webview.getURL();
    switch (this.state.step) {
    case STEP.LOADING:
      if (url === GITHUB_URL.LOGIN) {
        this.setState({ step: STEP.LOGIN });
      }
      else {
        this.setState({
          step: STEP.GEN_TOKEN,
          url: GITHUB_URL.NEW_TOKEN,
        });
      }
      break;

    case STEP.LOGIN:
      this.setState({
        step: STEP.GEN_TOKEN,
        url: GITHUB_URL.NEW_TOKEN,
      });
      break;

    case STEP.GEN_TOKEN:
      if (await this.isTokenGenerated(url, webview)) {
        this.setState({ step: STEP.SAVE_TOKEN });
      }
      break;
    }
  }

  isTokenGenerated(url: string, webview: Electron.WebviewTag): Promise<boolean> {
    return new Promise((resolve) => {
      if (url !== GITHUB_URL.TOKENS) {
        resolve(false);
        return;
      }
      webview.executeJavaScript(
        // GitHub, please do not change the class name..!
        "document.querySelectorAll('.token').length",
        false,
        (len: number) => {
          resolve(len === 1);
        },
      );
    });
  }

  saveAccessToken = (token: string) => {
    this.props.dispatch(updateToken(token));
  }

  setToken = (token: string) => {
    this.setState({ token });
  }

  render() {
    const { state } = this;
    return (
      <div className="c_page-root p-login_root">
        <section className="p-login_instruction">
          <header className="p-login_header">
            <h1>Welcome to Giv</h1>
            <p>To start using Giv, please follow the steps below.</p>
          </header>
          <LoginSteps
            step={state.step}
            token={state.token}
            onTokenChange={this.setToken}
            onTokenSave={this.saveAccessToken}
          />
        </section>
        <section className="p-login_webview-container">
          <Browser onFinishLoad={this.updateStepsByGitHubURL} />
        </section>
        <Dialog>
          {this.renderConfirmation()}
        </Dialog>
      </div>
    );
  }
          // <Browser url={state.url} onFinishLoad={this.updateStepsByGitHubURL} />

  renderConfirmation() {
    return (
      <div className="login-confirm-container">
        <div className="login-confirm-row">
          <p className="login-confirm-greet">
          Hello, @ryym :)
          </p>
          <img className="login-confirm-avatar" src="https://avatars1.githubusercontent.com/u/12684251?v=4" alt="" />
        </div>
      </div>
    )
  }
}

export default connect()(LoginPage);
