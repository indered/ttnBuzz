import { userLogout } from "../../actions/user-actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./header";
import { Cover } from "./styles";
import Profile from "./profile";
import Menu from "./menu";
import "./home-style.css";
class Home extends Component {
  // componentDidMount() {
  //   // console.log("user: ", this.props.user);
  //   if (this.props.err) console.log("err: ", this.props.err);
  // }

  logout = () => {
    this.props.userLogout();
  };

  render() {
    return (
      <div className="buzz">
        <Header logout={this.logout} />
        <section className="cover">
          <Cover />
          <p className="cover-title">
            posting your thoughts never been so easy..
          </p>
        </section>
        <Profile />
        <section className="body">
          <Menu isAdmin={this.props.user.isAdmin} />
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    err: state.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
