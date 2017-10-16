import React from 'react';
import { Router, Route, RouteParam } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import State from '../store/state';
import { getAccessToken } from '../store/selectors';
import AuthGuard from './AuthGuard';
import LoginPage from './pages/LoginPage';
import NotifsPage from './pages/NotifsPage';
import { History } from 'history';
import { Dispatch } from '../store/types';
import { push } from '../store/router/actions';

export type Props = {
  history: History,
};

export default function App({ history }: Props) {
  return (
    <ConnectedRouter history={history}>
      <div className="c_route-container">
        <Route exact path="/" component={MainRoutes} />
        <Route exact path="/login" component={LoginRoutes} />
      </div>
    </ConnectedRouter>
  );
}

function MainRoutes() {
  return (
    <AuthGuard requireToken fallbackPath="/login">
      <Route exact path="/" component={NotifsPage} />
    </AuthGuard>
  );
}

function LoginRoutes({ match }: RouteParam) {
  return (
    <AuthGuard fallbackPath="/">
      <Route exact path={match.url} component={LoginPage} />
    </AuthGuard>
  );
}
