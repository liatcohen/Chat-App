import React, { Component } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import './UserAuthentication.css';

class UserAuthentication extends Component {

  state = {
    // login: false,
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
          // <div className="contents">
          // <div>aaa</div>
          <SignUp userLoggedIn={this.userIn} />
          //   <div className="title">Welcome</div>
          //   <button onClick={this.signUpClicked}>Sign Up</button>
          //   <div className="already">Already have an account? </div>
          //   <button onClick={this.loginClicked}>Log in</button>
          // </div>
          : <div>
            {/* {this.state.login ? */}
              <Login userLoggedIn={this.userIn} />
              {/* : <SignUp userLoggedIn={this.userIn} /> */}
            {/* } */}
          </div>
        }
      </div>
      </div>
    );
  };
};

export default UserAuthentication;
