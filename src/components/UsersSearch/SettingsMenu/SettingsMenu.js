
import React, { Component } from 'react';
import './SettingsMenu.css';

class SettingsMenu extends Component {

  state = {
    file: null,
    imagePreviewUrl: null,
    imagePreview: null
  }

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
          <button><i className="fa fa-info-circle"></i>   My Details </button>
          <div className="upload-btn">
            <button><i className="fa fa-camera"></i>    Add profile picture </button>
            <input type="file" name="profile_picture" onChange={(e) => this.handleImageChange(e)} htmlFor="profile_picture" />
          </div>
          <button onClick={this.props.logOut}><i className="fa fa-sign-out"></i>    Log Out </button>
        </div>
      </div>
    );
  }
};

export default SettingsMenu;
