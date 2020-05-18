import {
  MDBCollapse,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
  MDBTooltip,
} from "mdbreact";
import React, { Component } from "react";
import DHBWLogo from "../../assets/DHBW-Logo.png";
import { clearSessionStorage } from "../../auth/verifyPw";
import * as swalHelper from "../../util/swalHelper";
import "./Navigation.css";

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { collapseID: "" };
  }

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  closeCollapse = (collID) => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: "" });
  };

  logOutUser = () => {
    clearSessionStorage();
    this.closeCollapse("mainNavbarCollapse");
    swalHelper.success("Logged out successfully!");
    this.forceUpdate();
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;
    return (
      <>
        <MDBNavbar color="grey darken-2" dark expand="md" fixed="top" scrolling>
          <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
            <img
              src={DHBWLogo}
              style={{ width: 120, marginRight: 20 }}
              alt="DHBWLogo"
            />
            <strong className="align-middle">
              My Learning Analytics - A DHBW-Student project
            </strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            onClick={this.toggleCollapse("mainNavbarCollapse")}
          />
          <MDBCollapse id="mainNavbarCollapse" isOpen={collapseID} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink
                  exact
                  to="/"
                  onClick={this.closeCollapse("mainNavbarCollapse")}
                >
                  <strong>Home</strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  onClick={this.closeCollapse("mainNavbarCollapse")}
                  to="/dashboard"
                >
                  <strong>Dashboard</strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  onClick={this.closeCollapse("mainNavbarCollapse")}
                  to="/survey"
                >
                  <strong>Survey</strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  onClick={this.closeCollapse("mainNavbarCollapse")}
                  to="/admin"
                >
                  <strong>Admin</strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  onClick={this.closeCollapse("mainNavbarCollapse")}
                  to="/myaccount"
                >
                  <strong>
                    <MDBIcon far icon="user" />
                  </strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink onClick={this.logOutUser} to="/">
                  <strong>
                    <MDBIcon far icon="sign-out-alt" />
                  </strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem className="mr-2">
                <MDBTooltip
                  placement="bottom"
                  domElement
                  style={{ display: "block" }}
                >
                  <a
                    className="nav-link Ripple-parent"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>
                      <MDBIcon icon="question-circle" />
                    </strong>
                  </a>
                  <span>SUPPORT</span>
                </MDBTooltip>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        {collapseID && overlay}
      </>
    );
  }
}

export default NavbarComponent;
