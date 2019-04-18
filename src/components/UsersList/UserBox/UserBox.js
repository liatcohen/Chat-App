import React, { Component } from 'react';
import './UserBox.css';

class UserBox extends Component {

  render() {

    return (
      <li className={this.props.selected ? "active" : ""}>
        <div className="userBox" onClick={this.props.click}>
          <div className="img">
            {this.props.online ? <i className="fa fa-circle" /> : null}
            <img src={this.props.img} />
          </div>
          <div className="desc">
            {(!this.props.selected && this.props.new && this.props.new === this.props.userName) ?
              <small class="outer">
                <svg viewBox="0 0 140 140" preserveAspectRatio="xMinYMin meet">
                  <g>
                    <circle r="50%" cx="50%" cy="50%" class="circle-back" />
                    <text x="50%" y="50%" text-anchor="middle" dy="0.3em">1</text>
                  </g>
                </svg>
              </small>
              : null}
            <small className="time">05:30 am</small>
            <h5>{this.props.userName}</h5>
          </div>
        </div>
      </li>
    );
  };
}

export default UserBox;
