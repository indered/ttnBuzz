import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/login/login";
import { fetchUser } from "../src/actions/user-actions";
import Home from "./components/home/home";

import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={() =>
            !this.props.user ? <Login /> : <Redirect to="/home" />
          }
        />
        <Route
          exact
          path="/home"
          render={() =>
            !this.props.user ? <Login /> : <Redirect to="/home/Buzz" />
          }
        />
        <Route
          exact
          path="/home/Buzz"
          render={props =>
            this.props.user ? <Home {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/home/Complaints"
          render={props =>
            this.props.user ? <Home {...props} /> : <Redirect to="/" />
          }
        />

        <Route
          exact
          path="/home/Resolve"
          render={props =>
            this.props.user ? <Home {...props} /> : <Redirect to="/" />
          }
        />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
