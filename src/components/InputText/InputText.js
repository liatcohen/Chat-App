import React, { Component } from 'react';
import './InputText.css';

class InputText extends Component {
  state = {
    msgText: '',
  }

  updateInput = (event) => {
    this.setState({ msgText: event.target.value })
  }

  sendMessage = (e) => {
    e.preventDefault()
    this.props.clicked(this.state.msgText, "text");
    this.setState({ msgText: '' });
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      const img = e.target.result;
      this.props.clicked(img, "image");
    }
  }

  render() {
    return (
      <div className="input-comp">
        <div className="upload-btn">
          <button className="btn"><i className="fa fa-photo"></i></button>
          <input type="file" name="myfile" onChange={(e) => this.handleImageChange(e)} />
        </div>
        <form style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
          <input type="text"
            style={{ flex: 1 }}
            value={this.state.msgText}
            onChange={this.updateInput}
            placeholder="type here..."
            disabled={this.props.isDisabled} />
          <button className="btn-send"
            onClick={(e) => {
              this.sendMessage(e);
            }}
            disabled={!this.state.msgText}>
            <i className="fa fa-send"></i></button>
        </form>
      </div>
    );
  };
}
export default InputText;
