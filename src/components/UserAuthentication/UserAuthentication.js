import React, { Component } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import './UserAuthentication.css';

class UserAuthentication extends Component {

  state = {
    login: false,
    SignUp: false,
  }

  loginClicked = () => {
    this.setState({ login: true });
  }

  signUpClicked = () => {
    this.setState({ SignUp: true });
  }

  userIn = (userId) => {
    this.props.userLoggedInProp(userId);
  }

  render() {

    return (

      <div>
        {!this.state.login && !this.state.SignUp ?
          <div className="content">
            <div className="title">welcome</div>
            <button onClick={this.signUpClicked}>Sign Up</button>
            <div className="already">Already have an account? </div>
            <button onClick={this.loginClicked}>Log in</button>
          </div>
          : <div>
            {this.state.login ?
              <Login userLoggedIn={this.userIn} />
              : <SignUp userLoggedIn={this.userIn} />
            }
          </div>
        }
      </div>
    );
  };
};

export default UserAuthentication;
