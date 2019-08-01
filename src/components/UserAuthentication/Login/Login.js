import React, { Component } from 'react';
import '../UserAuthentication.css'
import * as firebase from 'firebase/app';
import 'firebase/auth';

class Login extends Component {
  state = {
    email: null,
    password: null,
    tmp: false,
    userId: null,
    errors:{
      email: null,
      password:null
    }
  }

  loginToAccount = () => {
    if (this.validateFormInputs(this.state.email, this.state.password)) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          const userID = firebase.auth().currentUser.uid;
          this.props.userLoggedIn(userID);
        })
        .catch((error) => {
          alert("loginToAccount ERROR " + error.code + error.message);
        });
    }
  }
  validateFormInputs = (email, password) => {
    let isValid = true
    const errors = {
      email: null,
      password: null,
    }
    if (!email) {
      errors.email = "Email can't be empty"
      isValid = false
    }
    if (!password) {
      errors.password = "Password can't be empty"
      isValid = false
    }
    this.setState({
      errors: errors,
    })
    return isValid
  }


  render() {
    return (
      <div>
        <div>
          <div className="title">Welcome Back!</div>
          <input type="text"
            placeholder={this.state.errors.email ? this.state.errors.email : "E-mail"}
            id={this.state.errors.email ? "error" : null}
            onChange={(event) => this.setState({ email: event.target.value })} />
          <input type="password"
            placeholder={this.state.errors.password ? this.state.errors.password : "Password"}
            id={this.state.errors.password ? "error" : null}
            onChange={(event) => this.setState({ password: event.target.value })} />
          <LoginButton login={this.loginToAccount} />
        </div>
      </div>
    );
  };
};

export default Login;
