import React, { Component } from "react";
import styled from "styled-components";
import posed from "react-pose";
import "./home-style.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Buzz from "./buzz/buzz";
import Complaints from "./complaints/complaint";
import Resolve from "./resolve/resolve";

const Sidebar = posed.ul({
  open: {
    x: "0%",
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: "-100%", delay: 300 }
});

const Item = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

const StyledItem = styled(Item)`
  list-style-type: none;
  padding: 20px 80px 20px 20px;
  cursor: pointer;
  font-size: 17px;
  border-bottom: 2px solid rgb(222, 225, 226);
  position: relative;
`;

class Menu extends Component {
  state = {
    isOpen: false,
    menuItems: ["Buzz", "Complaints"]
  };

  componentDidMount() {
    setTimeout(this.toggle, 500);
    console.log(this.state);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen, menuItems } = this.state;

    return (
      <Router>
        <Sidebar className="sidebar" pose={isOpen ? "open" : "closed"}>
          {menuItems.map((item, i) => {
            return (
              <NavLink to={`/home/${item}`} activeClassName="selected-item">
                <StyledItem className="item">
                  <span> {item}</span>
                  <i className="fas fa-chevron-right" />
                </StyledItem>
              </NavLink>
            );
          })}
          {(() => {
            if (this.props.user.isAdmin)
              return (
                <NavLink to={`/home/Resolve`} activeClassName="selected-item">
                  <StyledItem className="item">
                    <span>Resolve </span> <i className="fas fa-chevron-right" />
                  </StyledItem>
                </NavLink>
              );
          })()}
        </Sidebar>
        <Route exact path="/home/Buzz" render={() => <Buzz />} />
        <Route exact path="/home/Complaints" render={() => <Complaints />} />
        <Route exact path="/home/Resolve" render={() => <Resolve />} />
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Menu);
