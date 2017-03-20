import React from 'react';
import { Router, Route } from 'react-router';
import Main from './Main';

export default function Root({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Main} />
    </Router>
  );
}
