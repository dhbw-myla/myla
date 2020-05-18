import React, { Component } from "react";
import Login from "./login";
import ParticipateComponent from "./participate";
import Signup from "../signup/signup";
import '../Home/startpage.css'
import DHBWTeaser from "../../assets/teaser.jpg";
import { MDBBtn, MDBInput } from "mdbreact";

class Startpage extends Component {
  constructor(props) {
    super(props);
    this.state = { showLogin: true };
  }

  handleShowLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  render() {
    const { showLogin } = this.state;

    if (showLogin) {
      return (
        <div className='background' style={{ backgroundImage: `url(${DHBWTeaser})` }}>
          <div className='container'>
            <div className="card bg-card-background text-light">
              <div className="card-body">
                <h1 className='text-center text-dark'>MyLA Login</h1>
                <form>
                  <div className="form-group">
                    <MDBInput label="Survey Code" type="text" name="surveyCode" />
                    <MDBBtn className="btn btn_dhbw">Enter</MDBBtn>
                  </div>
                  <div className="form-group">
                    <MDBInput label="E-Mail" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="form-group">
                    <MDBInput label="Passwort" type="password" className="form-control" id="exampleInputPassword1" />
                    <div className="div_button_split">
                      <MDBBtn type="submit" className="btn btn_split btn_dhbw">Login</MDBBtn>
                      <MDBBtn type="submit" className="btn btn_split btn_dhbw">Sign Up</MDBBtn>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Signup handleShowLogin={this.handleShowLogin} />;
    }
  }
}

export default Startpage;
