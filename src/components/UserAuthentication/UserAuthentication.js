import React, { Component } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import './UserAuthentication.css';

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

  userIn = (userId) => {
    this.props.userLoggedInProp(userId);
  }

  render() {

    return (
      <div className="authentication-screen">
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
