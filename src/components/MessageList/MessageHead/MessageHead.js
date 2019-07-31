import React, { Component } from 'react';

class MessageHead extends Component {
  render() {

    return (
      <div className="msg-head">
        <div className="user-img"><img src={this.props.img} /></div>
        <div className="user-info">
          <div className="user-name">{this.props.name}</div>
          <div className="is-online"><small>{this.props.name && (this.props.online ? 'online' : 'offline')}</small></div>
        </div>
      </div>
    );
  };
};

export default MessageHead;
