import React, { Component } from 'react';
import './SettingsMenu.css';

class SettingsMenu extends Component {

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      const img = e.target.result;
      this.props.uploadProfilePic(img);
    }
  }

  render() {

    return (
      <div>
        <div className="setting-menu">
          <button onClick={this.props.detailsClicked}><i className="fa fa-info-circle"></i>   My Details </button>
          <div id="upload" className="upload-btn">
            <button><i className="fa fa-camera"></i>    Add profile picture
            <input type="file" name="profile_picture" onChange={(e) => this.handleImageChange(e)} htmlFor="profile_picture" />
            </button>
          </div>
          <button onClick={this.props.logOut}><i className="fa fa-sign-out"></i>    Log Out </button>
        </div>
      </div>
    );
  }
};

export default SettingsMenu;
