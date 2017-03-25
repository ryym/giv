import React from 'react';
import Nav from './Nav';

export default function Layout({ children }) {
  return (
    <div className="giv-container">
      <header className="giv-header">
        <Nav />
      </header>
      <div className="giv-main">
        {children}
      </div>
    </div>
  );
}
