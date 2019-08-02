import React, { Component } from 'react';
import './MessageList.css';
import Message from './Message/Message';
import Lottie from 'react-lottie'
import animationData from '../../Lottie/arrow.json'


class MessageList extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    let messages = null
    if (this.props.chatMessages) {
      messages = Object.keys(this.props.chatMessages['messages']).map(key => {
        return <ul>
          <Message
            messageText={this.props.chatMessages['messages'][key]['messageText']}
            reciverId={this.props.chatMessages['messages'][key]['reciverId']}
            senderId={this.props.chatMessages['messages'][key]['senderId']}
            timeStamp={this.props.chatMessages['messages'][key]['timeStamp']}
            type={this.props.chatMessages['messages'][key]['type']}
            userImg={this.props.currUserId === this.props.chatMessages['messages'][key]['senderId'] ? this.props.myUserImg : this.props.otherUserImage}
            class={this.props.currUserId === this.props.chatMessages['messages'][key]['senderId'] ? 'msg-right' : 'msg-left'} />
        </ul>
      });
    }

    return (
      <div className="message msg-list" data-mcs-theme="minimal-dark">
        {this.props.currChatConnection ?
          messages :
          <div id="pick-room-msg">
            Pick a chat room to start chatting
        <Lottie options={defaultOptions}
              height={400}
              width={400} />
          </div>}
      </div>
    );
  };
};

export default MessageList;
