import React, { Component } from 'react';

function ImageMessage(props) {
  return (
    <div className={props.class === "msg-right" ? "user-msg-right" : "user-msg-left"}>
      <div class="user-side-img"><img  src={props.userImg} /></div>
      <div className="img-msg-inner">
        <div class="img-msg"><img id="image-msg" src={props.messageText} /> <small>{props.timeStamp}</small>
        </div>
      </div>
    </div>)
}

function TextMessage(props) {
  return (
    <li className={props.class}>
      <div className="msg-left-sub">
        <img src={props.userImg} />
        <div className="msg-desc">
          {props.messageText}
        </div>
        <small>{props.timeStamp}</small>
      </div>
    </li>
  )
}
class Message extends Component {

  render() {
    return (
      <div>
        {this.props.type === "text" ?
          <TextMessage userImg={this.props.userImg}
            messageText={this.props.messageText}
            timeStamp={this.props.timeStamp['time']}
            class={this.props.class} />
          :
          <ImageMessage userImg={this.props.userImg}
            messageText={this.props.messageText}
            timeStamp={this.props.timeStamp['time']}
            class={this.props.class} />
        }
      </div>
    );
  };
};


export default Message;
