import React, { Component } from 'react';

class MessageHead extends Component {
  render() {

    return (
      <div className="headRight-section">
        <div className="headRight-sub">
          <h3>{this.props.name}</h3>
          <small>{this.props.name && (this.props.online ? 'online' : 'offline')}</small>
        </div>
      </div>
    );
  };
};

export default MessageHead;
