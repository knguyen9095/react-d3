import React, { Component } from "react";
import D3DirectedGraph from "../D3DirectedGraph/D3DirectedGraph";
import "./secret.css";

export default class Secret extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        {auth.isAuthenticated ? (
          <div>
            <p className="pad">
              Each line (opacity) represent how many time that the <b>To</b> and{" "}
              <b>From</b> contacted each other. Darker Line = the more they
              communicate
            </p>
            <D3DirectedGraph />
          </div>
        ) : (
          <div>Sorry! Not authorized. Please login</div>
        )}
        {auth.error && <p>{JSON.stringify(auth.error)}</p>}
      </div>
    );
  }
}
