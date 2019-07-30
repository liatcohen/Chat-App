import React from 'react';
import './UserDetails.css';

class UserDetails extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
        <h1>{this.props.userName}</h1>
            <img src={this.props.img}></img>
            <p><b>email: </b> {this.props.email}</p>
        <button onClick={this.props.closePopup}>close</button>
        </div>
      </div>
    );
  }
}

export default UserDetails;