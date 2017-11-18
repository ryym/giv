import React from 'react';
import classes from 'classnames';
import Icon from '../widgets/Icon';

const notifScopeImage = require('../../images/login-step-notif-scope.png');

export interface Props {
  step: number;
  token: string;
  onTokenChange: (token: string) => void;
  onTokenSave: (token: string) => void;
}

export const STEP = Object.freeze({
  LOADING: 0,
  LOGIN: 1,
  GEN_TOKEN: 2,
  SAVE_TOKEN: 3,
});

export default class LoginSteps extends React.PureComponent<Props> {
  onTokenChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.onTokenChange(event.currentTarget.value);
  }

  onTokenSave = (event: React.FormEvent<any>) => {
    event.preventDefault();
    this.props.onTokenSave(this.props.token);
  }

  render() {
    const { props, renderStep } = this;
    return (
      <ol className={classes('login-steps_steps', {
        'is-disabled': props.step === STEP.LOADING,
      })}>
        {renderStep(STEP.LOGIN, (
          <p>Sign in to GitHub.</p>
        ))}
        {renderStep(STEP.GEN_TOKEN, (
          <div>
            <p>
              Generate an access token for this app.<br />
              {/*The <strong>notifications</strong> scope is required. */}
              Make sure to check <strong>notifications</strong> scope like below:
            </p>
            <img src={notifScopeImage} alt="" className="login-steps_notif-scope-img" />
          </div>
        ))}
        {renderStep(STEP.SAVE_TOKEN, (
          <div>
            <p>
              Paste and save the access token you created!
            </p>
            {this.renderForm()}
          </div>
        ))}
      </ol>
    );
  }

  renderStep = (step: number, content: JSX.Element) => {
    const current = this.props.step;
    const stepState = step < current ? 'done' : (step > current ? 'notyet' : 'current');
    return (
      <li className={`login-steps_step is-${stepState}`}>
        {step < current && (
          <Icon id="check" className="login-steps_step-icon" />
        )}
        {step === current && (
          <Icon id="arrow-right" className="login-steps_step-icon" />
        )}
        {content}
      </li>
    );
  }

  renderForm() {
    const { props } = this;
    return (
      <form className="login-steps_form" onSubmit={this.onTokenSave}>
        <input
          type="text"
          className="login-steps_form_token"
          value={props.token}
          onChange={this.onTokenChange}
        />
        <button
          type="submit"
          className="login-steps_form_submit"
          disabled={props.token.trim().length === 0}
        >
         Save
        </button>
      </form>
    );
  }
}
