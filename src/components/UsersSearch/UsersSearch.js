import React, { Component } from 'react';
import './UsersSearch.css';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import 'react-dropdown/style.css';

class usersSearch extends Component {

  state = {
    showSettings: false
  }

  settingsClicked = () => {
    this.setState({ showSettings: !this.state.showSettings });
  }

  render() {

    return (
      <div className="headLeft-section">
        <div className="headLeft-info">
          <button onClick={this.settingsClicked}>
            <i className="fa fa-ellipsis-v"></i>
          </button>
          <div className="menu">
            {this.state.showSettings ?
              <div>
                <SettingsMenu logOut={this.props.logOut} uploadProfilePic={this.props.uploadProfilePic}/>
              </div>
              : null}
          </div>


          <div className="search">
            <input type="text" name="search" placeholder="Search..." />
            <button> <i className="fa fa-search"></i> </button>
          </div>
        </div>
      </div>
    );
  };
}

export default usersSearch;
