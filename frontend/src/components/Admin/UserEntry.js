import React, { Component } from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAnimation,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBCardText,
  MDBNavLink
} from "mdbreact";

class UserEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { entry } = this.props;
    const { firstname, name } = entry;
    const user = name + ", " + firstname;
    return (
      <MDBCol md="4">
        <MDBAnimation reveal type="">
          <MDBCard cascade className="my-3 grey lighten-4">
            <MDBCardBody cascade className="text-center">
              <MDBCardTitle>
                <MDBIcon icon="users" className="blue-text pr-2" />
                <strong>{user}</strong>
              </MDBCardTitle>
              <MDBCardText>Edit details for {user}</MDBCardText>
              <MDBNavLink
                tag="button"
                to="#"
                color="mdb-color"
                className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                onClick={() => this.editUser(user)}
              >
                Edit
              </MDBNavLink>
            </MDBCardBody>
          </MDBCard>
        </MDBAnimation>
      </MDBCol>
    );
  }
}

export default UserEntry;
