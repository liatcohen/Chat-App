import React, { Component } from 'react';
import '../UserAuthentication.css'
import * as firebase from 'firebase/app';
import 'firebase/auth';

class Login extends Component {

  state = {
    email: null,
    password: null,
    tmp: false,
    userId: null
  }

  loginToAccount = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const userID = firebase.auth().currentUser.uid;
        this.props.userLoggedIn(userID);
      })
      .catch((error) => {
        alert("loginToAccount ERROR " + error.code + error.message);
      });
  }


  render() {
    return (
      <div>
        <div >
          <div className="title">Welcome Back!</div>
          <input type="text" placeholder="E-mail" onChange={(event) => this.setState({ email: event.target.value })} />
          <input type="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
          <button onClick={this.loginToAccount}>Log In</button>
        </div>
      </div>
    );
  };
};

export default Login;
