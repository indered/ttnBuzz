import { Redirect } from "react-router-dom";
import axios from "axios";

import React, { Component } from "react";

export default class Buzz extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    return axios.get(`http://localhost:3000/user`).then(response => {
      let user = response.data;
      this.setState(
        {
          user: user
        },
        () => console.log(this.state)
      );
    });
  }

  render() {
    return <div>hello {this.state.user.username}</div>;
  }
}
