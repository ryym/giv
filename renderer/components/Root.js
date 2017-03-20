import React from 'react';
import { Router, Route } from 'react-router';
import TokenForm from './TokenForm';

export default function Root({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={TokenForm} />
    </Router>
  );
}
