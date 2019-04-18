import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCle4l6aaELh_43-obfBunxAPv8in5JjYA",
    authDomain: "my-chat-app-a778f.firebaseapp.com",
    databaseURL: "https://my-chat-app-a778f.firebaseio.com",
    projectId: "my-chat-app-a778f",
    storageBucket: "my-chat-app-a778f.appspot.com",
    messagingSenderId: "883893720317"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
