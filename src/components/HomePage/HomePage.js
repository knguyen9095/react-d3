import React, { Component } from "react";
import "./Home.css";
import Message from "../Message/Message";

export default class HomePage extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div className="container1">
        {auth.isAuthenticated ? (
          <div>
            <p> Hello, welcome to the dashboard</p>

            <Message />
          </div>
        ) : (
          <div>
            {" "}
            <h2>Welcome</h2>
            <p>Please login or sign up on the right hand corner. </p>
          </div>
        )}
        {auth.error && <p>{JSON.stringify(auth.error)}</p>}
      </div>
    );
  }
}
