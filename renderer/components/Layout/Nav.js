import React from 'react';
import { Link } from 'react-router-dom';
import * as paths from '../../const/paths';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMenuOpen: false };
    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
  }

  toggleMenuOpen() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    const { state } = this;
    return (
      <nav className="nav">
        <div className="nav-left">
          <Link to={paths.root} className="nav-item">
            Giv
          </Link>
        </div>

        <span className="nav-toggle" onClick={this.toggleMenuOpen}>
          <span />
          <span />
          <span />
        </span>

        <div className={`nav-right nav-menu ${state.isMenuOpen ? 'is-active' : ''}`}>
          <Link to={paths.notifications} className="nav-item">
            Notifications
          </Link>
          <Link to={paths.tokenRegistration} className="nav-item">
            Access Token
          </Link>
        </div>
      </nav>
    );
  }
}

