import React, { Component } from "react";
import CreateBuzz from "./create-buzz";

export default class Buzz extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="body-content">
        <CreateBuzz />
      </div>
    );
  }
}
