import React, { Component } from "react";
import PropTypes from "prop-types";

import * as AuthService from "../../utils/AuthService";
import "./Header.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  Button
} from "reactstrap";

class HeaderView extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      profile: PropTypes.object,
      error: PropTypes.object
    }).isRequired,
    loginRequest: PropTypes.func.isRequired,
    logoutSuccess: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLoginClick = () => {
    AuthService.login();
    this.props.loginRequest();
  };

  handleLogoutClick = () => {
    this.props.logoutSuccess();
    AuthService.logout(); // careful, this is a static method
    this.props.history.push({ pathname: "/" });
  };

  render() {
    const { auth } = this.props;
    return (
      <div>
        <Navbar dark expand="md">
          <NavbarBrand className="navbar-brand" href="/">
            Enron
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!auth.isAuthenticated ? (
                <div>
                  <Button
                    onClick={this.handleLoginClick}
                    className="btn btn-danger navbar-btn"
                  >
                    Login
                  </Button>
                </div>
              ) : (
                <div>
                  <ul className="list-inline">
                    <li>
                      <NavLink href="/">Message</NavLink>
                    </li>
                    <li>
                      <NavLink href="/graph">Graph</NavLink>
                    </li>
                    <li>
                      <Button
                        onClick={this.handleLogoutClick}
                        className="btn btn-danger navbar-btn"
                      >
                        Logout
                      </Button>{" "}
                    </li>
                  </ul>
                </div>
              )}
            </Nav>
          </Collapse>
        </Navbar>

        {auth.isAuthenticated ? (
          /*<div>
            <img src={auth.profile.picture} height="40px" alt="profile" />
            <span>Welcome, {auth.profile.nickname}</span>
          </div>*/
          <div />
        ) : (
          <div />
        )}
        {auth.error && <p>{JSON.stringify(auth.error)}</p>}
      </div>
    );
  }
}

export default HeaderView;
