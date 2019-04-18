import React, { Component } from 'react';
import ChatManager from '../ChatManager/ChatManager'
import UserAuthentication from '../UserAuthentication/UserAuthentication';

class ChatUI extends Component {
  state = {
    currUserId: null,
  }
  componentDidMount = () => {
    this.setState({ currUserId: localStorage.getItem('currUserId') });

  }
  userLoggedIn = (userId) => {
    localStorage.setItem('currUserId', userId);
    this.setState({ currUserId: userId });
  }

  logOut = () => {
    localStorage.clear();
    this.setState({ currUserId: null });
  }

  render() {
    return !localStorage.getItem('currUserId') ?
      <UserAuthentication userLoggedInProp={this.userLoggedIn} /> :
      <ChatManager currUserId={this.state.currUserId} logOut={this.logOut} />
  }
}
export default ChatUI;
