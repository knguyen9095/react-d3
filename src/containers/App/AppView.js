import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Header from "../Header/Header";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import SecretView from "../../components/SecretPage/SecretView";
import Loading from "../../components/Callback/Loading";
import HomeView from "../../components/HomePage/HomeView";

import * as AuthService from "../../utils/AuthService";

class AppView extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    loginError: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { history, loginError, loginSuccess } = this.props;
    // Add callback for lock's `authenticated` event
    AuthService.lock.on("authenticated", authResult => {
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return loginError(error);
        }
        AuthService.setToken(authResult.idToken); // static method
        AuthService.setProfile(profile); // static method
        loginSuccess(profile);
        history.push({ pathname: "/" });
        AuthService.lock.hide();
      });
    });
    // Add callback for lock's `authorization_error` event
    AuthService.lock.on("authorization_error", error => {
      loginError(error);
      history.push({ pathname: "/" });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/graph" component={SecretView} />
          <Route path="/callback" component={Loading} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default AppView;
