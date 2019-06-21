import React, { Component } from "react";
import posed from "react-pose";

class Login extends Component {
  render() {
    console.log("in login");
    console.log(this.props);
    return (
      <div className="App-header ">
        <h1 className="title">ttn buzz</h1>
        <div className="w3-container w3-center w3-animate-bottom">
          <p className="login-p"> Please login to continue.</p>
          <GoogleButton>
            <a href="http://localhost:3000/auth/google">
              <i className="fab fa-google-plus-square" />
            </a>
          </GoogleButton>
        </div>
      </div>
    );
  }
}

export default Login;

const GoogleButton = posed.div({
  pressable: true,
  // init: { scale: 1 },
  // press: { scale: 0.8 },
  hoverable: true,
  init: {
    scale: 1
  },
  hover: {
    scale: 1.2
  },
  press: {
    scale: 1.1
  }
});
