import React, { Component } from 'react';
import UserBox from './UserBox/UserBox';

class UsersList extends Component {

  render() {
    let users = null;

    if (!users) {
      users = this.props.users;
    }
    let userBoxList = null;
    if (users) {
      userBoxList = Object.keys(users).map(key => {
        return <UserBox
          userName={users[key].userName}
          data={users[key].data}
          online={users[key].online}
          img={users[key].img}
          click={() => this.props.click(key)}
          selected={users[key].selected}
          new={this.props.new}
          newMessage={users[key].hasOwnProperty('newMessage') && users[key]['newMessage'] ? true : false} />
      });
    }

    return (
      <ul>
        {userBoxList}
      </ul>
    );
  };
};

export default UsersList;
