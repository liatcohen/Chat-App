import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

class SignUp extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    img: null
  }

  createAccount = () => {
    const userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    }
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

  render() {

    return (
      <div>
        <div className="content">
          <div className="title">Create account</div>
          <input type="text" placeholder="First Name" onChange={(event) => this.setState({ firstName: event.target.value })} />
          <input type="text" placeholder="Last Name" onChange={(event) => this.setState({ lastName: event.target.value })} />
          <input type="text" placeholder="E-mail" onChange={(event) => this.setState({ email: event.target.value })} />
          <input type="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
          <button onClick={this.createAccount}>Create Account</button>
        </div>
      </div>
    );
  };
};

export default SignUp;
