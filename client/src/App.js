import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/login/login";
import Buzz from "./components/buzz/buzz";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" render={() => <Login />} />
        <Route exact path="/buzz" render={() => <Buzz />} />
        {/* <Route
          exact
          path="/book-list/book/:id"
          render={props =>
            this.state.user.isAuth ? (
              <Book
                {...props}
                bookList={this.state.bookList}
                toggleAuth={this.toggleAuth}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        /> */}
      </Router>
    );
  }
}

export default App;
