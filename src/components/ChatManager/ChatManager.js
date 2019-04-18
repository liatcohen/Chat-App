import React, { Component } from 'react';
import './ChatManager.css';
import UsersList from '../UsersList/UsersList';
import MessageList from '../MessageList/MessageList';
import InputText from '../InputText/InputText';
import UsersSearch from '../UsersSearch/UsersSearch';
import MessageHead from '../MessageList/MessageHead/MessageHead';
import axios from '../../axios-orders';
import firebase from 'firebase';
import Modal from '../UsersSearch/Modal/Modal'

class chatManager extends Component {

  stream = null;
  currChatConnectionObj = null

  state = {
    users: null,
    currUserId: null,
    currUser: null,
    currChatConnection: null,
    chatMessages: null,
    chatId: null,
    chats: null,
    new: null,
    displayChat: false
  }

  componentDidMount = () => {
    if (!localStorage.getItem('currUserIdInChat')) {
      localStorage.setItem('currUserIdInChat', this.props.currUserId);
    }
    this.setState({ currUserId: localStorage.getItem('currUserIdInChat') })
    axios.get('/users.json')
      .then(response => {
        let tempUsers = response.data;
        let tempCurrUser = tempUsers[this.props.currUserId];
        delete tempUsers[this.props.currUserId];
        this.setState({ users: tempUsers, currUser: tempCurrUser })
      });
    this.setUserOnOff(localStorage.getItem('currUserIdInChat'), true);
  }

  logOut = () => {
    this.setUserOnOff(this.state.currUserId, false)
    localStorage.clear();
    this.setState({ currUserId: null });
    this.props.logOut();
  }

  setUserOnOff = (userId, isOnline) => {
    firebase.database().ref('users/' + userId).update({
      online: isOnline
    })
  }
  getChatMessagesFromDB(chatId) {
    axios.get('/chats/' + chatId + '.json')
      .then(response => {
        this.setState({ chatMessages: response.data, chatId: chatId })
      });
  }

  listenForMessages = (chatId) => {
    const chatConnection = this.currChatConnectionObj;
    this.stream = firebase.database().ref('/chats/' + chatId)
    this.stream.on('value', (snapshot) => {
      if (this.currChatConnectionObj && chatId.includes(this.currChatConnectionObj)) {
        this.getChatMessagesFromDB(chatId);
      } else {
        const thisChatConnectionId = chatId.replace(localStorage.getItem('currUserIdInChat'), "");
        this.setState({ new: this.state.users[thisChatConnectionId]['userName'] })
      }
    })
  }

  getChatId = (newChatConnection) => {
    const currUserId = localStorage.getItem('currUserIdInChat');
    let chatId = (currUserId < newChatConnection ? currUserId + newChatConnection : newChatConnection + currUserId);
    this.setState({ chatId: chatId });
    this.getChatMessagesFromDB(chatId);
    return chatId;
  }


  sendMessage = (textMassage) => {
    if (!this.state.chatId) {
      alert('pick a chat room!');
      return;
    }
    const timestamp = Date.now();
    let msg = {
      messageText: textMassage,
      reciverId: this.state.currChatConnection,
      senderId: this.state.currUserId,
      timeStamp: {
        date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp),
        time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(timestamp)
      }
    }
    axios.post('/chats/' + this.state.chatId + '/messages.json', msg)
      .then(response => {
        this.getChatMessagesFromDB(this.state.chatId);
      })
      .catch(error => {
        console.log(error);
      });
  }

  newConnectionSelected = (newChatConnection) => {
    console.log("newChatConnection: ", newChatConnection)
    const updatedUsers = {
      ...this.state.users
    }
    if (this.state.currChatConnection) {
      let prevChatConnection = this.state.currChatConnection;
      updatedUsers[prevChatConnection].selected = false;
    }
    updatedUsers[newChatConnection].selected = true;
    this.setState({ users: updatedUsers, currChatConnection: newChatConnection });
    this.currChatConnectionObj = newChatConnection;
    const chatId = this.getChatId(newChatConnection)
    this.listenForMessages(chatId);

  }

  uploadProfilePicture = (profilePic) => {
    console.log("uploadProfilePicture!!")
    firebase.database().ref('users/' + localStorage.getItem('currUserIdInChat')).update({
      img: profilePic
    })
  }


  render() {
    return (
      <div className="main-section">
        <div className="head-section">
          <UsersSearch logOut={this.logOut} uploadProfilePic={this.uploadProfilePicture} />
          <MessageHead
            name={this.state.currChatConnection ? this.state.users[this.state.currChatConnection].userName : null}
            online={this.state.currChatConnection && this.state.users ? this.state.users[this.state.currChatConnection].online : ''} />
        </div>
        <div className="body-section">
          <div className="left-section">
            <UsersList users={this.state.users} click={this.newConnectionSelected} new={this.state.new} />
          </div>
          <div className="right-section">
            <MessageList chatMessages={this.state.chatMessages}
              currUserId={this.state.currUserId}
              currChatConnection={this.state.currChatConnection}
              chatID={this.state.chatId}
              myUserImg={this.state.currUser ? this.state.currUser['img'] : ''}
              otherUserImage={this.state.currChatConnection ? this.state.users[this.state.currChatConnection]['img'] : 'https://s3.amazonaws.com/prod.skimble/photos/29359/hstzsdw4avx_full.gif'} />
            <InputText clicked={this.sendMessage}
              isDisabled={!this.state.chatId} />
          </div>
        </div>
        <Modal />
      </div>
    );
  };
};

export default chatManager;
