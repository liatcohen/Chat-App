import React, { Component } from 'react';

class Message extends Component {

  render() {
    return (
      <div>
        <li className={this.props.class}>
          <div className="msg-left-sub">
            <img src={this.props.userImg} />
            <div className="msg-desc">
              {this.props.messageText}
            </div>
            <small>{this.props.timeStamp['time']}</small>
          </div>
        </li>
      </div>
    );
  };
};

export default Message;
