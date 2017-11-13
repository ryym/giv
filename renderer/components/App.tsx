import React from 'react';
import { Route, RouteParam } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import AuthGuard from './AuthGuard';
import AppErrorBoundary from './AppErrorBoundary';
import LoginPage from './pages/LoginPage';
import NotifsPage from './pages/NotifsPage';
import { History } from 'history';

export type Props = {
  history: History,
};

export default function App({ history }: Props) {
  return (
    <AppErrorBoundary>
      <ConnectedRouter history={history}>
          <div className="c_route-container">
              <Route exact path="/" component={MainRoutes} />
              <Route exact path="/login" component={LoginRoutes} />
          </div>
      </ConnectedRouter>
    </AppErrorBoundary>
  );
}

function MainRoutes({ match }: RouteParam) {
  return (
    <AuthGuard requireToken fallbackPath="/login">
      <Route exact path={match.url} component={NotifsPage} />
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
