import React, { Component } from "react";
import styled from "styled-components";
import posed from "react-pose";
import "./home-style.css";
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
const StyledSideBar = styled(Sidebar)`
  margin: 60px 0 0 40px;
  border: 1px rgb(219, 219, 219) solid;
  display: inline-flex;
  width: 250px;
  height: ${props => props.sideMenuHeight};
  padding: 0;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  -webkit-box-shadow: -1px 7px 17px -9px rgba(0, 0, 0, 1);
  -moz-box-shadow: -1px 7px 17px -9px rgba(0, 0, 0, 1);
  box-shadow: -1px 7px 17px -9px rgba(0, 0, 0, 1);
`;

class Menu extends Component {
  state = {
    isOpen: false
  };

  menuItems = [];
  sideMenuHeight = "";

  handleMenuItems = () => {
    if (this.props.isAdmin === false) {
      this.menuItems = ["Buzz", "Complaints"];
      this.sideMenuHeight = "135px";
    } else {
      this.menuItems = ["Buzz", "Complaints", "Resolve"];
      this.sideMenuHeight = "205px";
    }
  };

  componentDidMount() {
    setTimeout(this.toggle, 500);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    this.handleMenuItems();
    const { isOpen } = this.state;

    return (
      <Router>
        <StyledSideBar
          className="sidebar"
          sideMenuHeight={this.sideMenuHeight}
          pose={isOpen ? "open" : "closed"}
        >
          {this.menuItems.map((item, i) => {
            return (
              <NavLink
                to={`/home/${item}`}
                key={i}
                activeClassName="selected-item"
              >
                <StyledItem className="item">
                  <span> {item}</span>
                  <i className="fas fa-chevron-right" />
                </StyledItem>
              </NavLink>
            );
          })}
        </StyledSideBar>
        <Route exact path="/home/Buzz" render={() => <Buzz />} />
        <Route exact path="/home/Complaints" render={() => <Complaints />} />
        <Route exact path="/home/Resolve" render={() => <Resolve />} />
      </Router>
    );
  }
}

export default Menu;
