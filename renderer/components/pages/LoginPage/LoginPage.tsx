import React from 'react';
import classes from 'classnames';
import { connect } from 'react-redux';
import StoreState from '../../../store/state';
import { getAccessToken } from '../../../store/selectors';
import { Dispatch } from '../../../store/types';
import { updateToken } from '../../../store/user-config/actions';
import LoginSteps, { STEP } from '../../LoginSteps';
import Browser from '../../widgets/Browser';
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
    url: 'https://github.com/login',
    step: STEP.LOADING,
    token: '',
  };

  updateStepsByGitHubURL = ({ url }: Electron.LoadCommitEvent) => {
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
      if (url === GITHUB_URL.TOKENS) {
        this.setState({ step: STEP.SAVE_TOKEN });
      }
      break;

      // XXX: GitHub moves to `TOENS` URL even if
      // the validation is failed...
      // So this does not work perfectly.
    case STEP.SAVE_TOKEN:
      if (url === GITHUB_URL.NEW_TOKEN) {
        this.setState({ step: STEP.GEN_TOKEN });
      }
      break;
    }
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
          <Browser url={state.url} onURLChange={this.updateStepsByGitHubURL} />
        </section>
      </div>
    );
  }
}

export default connect()(LoginPage);
