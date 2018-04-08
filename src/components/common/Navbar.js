import React from 'react';
import { Link , withRouter} from 'react-router-dom';

import Auth from '../../lib/Auth';


class Navbar extends React.Component {

// we've created a property called state
  state = {
    navIsOpen: false,
    toggle: false,
    user: null
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  componentWillUpdate() {
    if(this.state.navIsOpen) this.setState({ navIsOpen: false});
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({toggle: !this.state.toggle});
  }

  render() {
    console.log(Auth.getPayload());
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
          Rivae
          </Link>
          <div
            className={`navbar-burger ${this.state.navIsOpen ? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link className="navbar-item" to={`/users/${Auth.getPayload().sub}`}>Your Profile</Link>
            {Auth.getToken() ? '' : <Link className="navbar-item" to="/register">Sign Up</Link>}
            {Auth.getToken() ? '' : <Link className="navbar-item" to="/login">Log In</Link>}
            {Auth.getToken() ? <Link className="navbar-item" onClick={Auth.logout} to="/">Log Out</Link> : ''}

          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
