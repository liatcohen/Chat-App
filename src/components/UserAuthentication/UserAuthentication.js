import React, { Component } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import './UserAuthentication.css';

function DemoButton(props) {
  return (
    <div>
      <svg viewBox="45 60 600 320" xmlns="http://www.w3.org/2000/svg">
        <path onClick={props.demoClicked} fill="#fed330" d="M 90 210 C 90 180 90 150 90 150 C 150 150 180 150 180 150 C 180 150 300 150 300 150 C 300 150 330 150 390 150 C 390 150 390 180 390 210 C 390 240 390 270 390 270 C 330 270 300 270 300 270 C 300 270 180 270 180 270 C 180 270 150 270 90 270 C 90 270 90 240 90 210" >
        </path>
        <text onClick={props.demoClicked} x="128" y="217" style={{ fill: '#000000' }}>Click Here For Demo!</text>
      </svg>
    </div>
  )
}

class UserAuthentication extends Component {

  state = {
    SignUp: true,
  }

  loginClicked = () => {
    this.setState({ SignUp: false });
  }

  signUpClicked = () => {
    this.setState({ SignUp: true });
  }

  demoClicked=()=>{
    console.log("demoClicked")
  }
  userIn = (userId) => {
    this.props.userLoggedInProp(userId);
  }

  render() {

    return (

      <div className="authentication-screen">
        <DemoButton demoClicked={this.demoClicked}/>
        <div className="content">
          <div className="authentication-header">
            <div className="header-button" id={this.state.SignUp ? "active" : ""} onClick={this.signUpClicked}>Sign Up</div>
            <div className="header-button" id={!this.state.SignUp ? "active" : ""} onClick={this.loginClicked}>Log in</div>
          </div>
          {this.state.SignUp ?
            <SignUp userLoggedIn={this.userIn} />
            : <div>
              <Login userLoggedIn={this.userIn} />
            </div>
          }
        </div>
      </div>
    );
  };
};

export default UserAuthentication;
