import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

class Login extends Component {
  render() {
    return (
      <div className="login">
        <header className="App-header ">
          <div className="branding">
            <i className="fas fa-book App-logo" />
            <h1>ttn buzz</h1>
          </div>
        </header>
        <p>Please login to continue.</p>

        <button type="submit" onClick={this.handleClick} value="Login">
          <a href="http://localhost:3000/auth/google"> Google</a>{" "}
        </button>
      </div>
    );
  }
}

export default Login;
