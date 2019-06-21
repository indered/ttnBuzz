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

  // componentDidMount() {
  //   axios
  //     .get(`http://localhost:3000/user`)
  //     .then(response => {
  //       let user = response.data;
  //       this.setState(
  //         {
  //           userLoggedIn: true,
  //           user: user
  //         },
  //         () => console.log(this.state)
  //       );
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState(
  //         {
  //           userLoggedIn: false
  //         },
  //         () => console.log(this.state)
  //       );
  //     });
  // }

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={() =>
            !this.props.user ? <Login /> : <Redirect to="/home/buzz" />
          }
        />
        <Route
          exact
          path="/home"
          render={() =>
            !this.props.user ? <Login /> : <Redirect to="/home/buzz" />
          }
        />
        <Route
          exact
          path="/home/buzz"
          render={() => (this.props.user ? <Home /> : <Redirect to="/" />)}
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
