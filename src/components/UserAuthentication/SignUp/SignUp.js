import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

class SignUp extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    img: null,
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    }
  }
  createAccount = () => {
    const userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    if (this.validateFormInputs(userDetails)) {
      console.log("all valid!!")
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          alert("you signed up successfully!");
          const user = firebase.auth().currentUser;
          firebase.database().ref('users/' + user.uid).set({
            userName: userDetails.firstName + " " + userDetails.lastName,
            email: userDetails.email,
            img: 'https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg',
            online: false,
            selected: false
          })
          this.props.userLoggedIn(user.uid);
        })
        .catch((error) => {
          alert("ERROR " + error.code + error.message);
        });
    }
  }

  validateFormInputs = (userDetails) => {
    let isValid = true
    let errors = {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
    if (!userDetails.firstName) {
      errors.firstName = "First name can't be empty"
      isValid = false
      userDetails.firstName = null
    }
    if (!userDetails.lastName) {
      errors.lastName = "Last name can't be empty"
      isValid = false
      userDetails.lastName = null
    }
    var testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!userDetails.email) {
      errors.email = "Email can't be empty"
      isValid = false
      userDetails.email = null
    } else if (!testEmail.test(String(userDetails.email).toLowerCase())) {//check if it's a valid email
      errors.email = "Not a valid email"
      isValid = false
      userDetails.email = ""
    }
    if (!userDetails.password || userDetails.password.length < 6) {
      errors.password = "Password should be at least 6 characters"
      isValid = false
      userDetails.password = ""
    }
    this.setState({
      errors: errors,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password
    })
    return isValid
  }
  render() {

    return (
      <div>
        <div>
          <div className="title">Sign Up for Free</div>
          <input type="text"
            placeholder={this.state.errors.email ? this.state.errors.email : "E-mail"}
            onChange={(event) => this.setState({ email: event.target.value })}
            id={this.state.errors.email ? "error" : null} />
          <input type="password"
            placeholder={this.state.errors.password ? this.state.errors.password : "Password"}
            id={this.state.errors.password ? "error" : null}
            onChange={(event) => this.setState({ password: event.target.value })}
            id={this.state.errors.password ? "error" : null} />
          <input type="text"
            placeholder={this.state.errors.firstName ? this.state.errors.firstName : "First Name"}
            id={this.state.errors.firstName ? "error" : null}
            onChange={(event) => this.setState({ firstName: event.target.value })} />
          <input type="text" id="error"
            placeholder={this.state.errors.lastName ? this.state.errors.lastName : "Last Name"}
            id={this.state.errors.lastName ? "error" : null}
            onChange={(event) => this.setState({ lastName: event.target.value })} />
          <button id="submit" onClick={this.createAccount}>Create Account</button>
        </div>
      </div>
    );
  };
};

export default SignUp;
