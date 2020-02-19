import React, { Component } from "react";
import axios from '../axios';
import { ROOT_API } from '../statics';
import Modal from 'react-modal';
class ProfilePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal(props) {
    this.setState({ showModal: false });

  }
  _handleTextChange = event =>
    this.props.onNameSignin &&
    this.props.onNameSignin(event.target.value);
  _handleTextChange1 = event =>
    this.props.onCMTSignin &&
    this.props.onCMTSignin(event.target.value);
  _onLogout = () => {
    axios({
      url: `${ROOT_API}/api/auth/logout`,
      method: "Delete",

    }).then(response => {

      window.location.href = `/`



      // toggleLoading(false);
    }).catch(error => {

      console.log(error)


    });
  };

  render() {
   
    const display = this.props.username ? (
      <div className="d-flex justify-content-center align-items-center">
        <span className="vang">Hello, {this.props.username.split(" ").splice(-1)}</span>

        <i
         
          className="ml-2 icon-sign-out"
          onClick={this._onLogout}>
       
        </i>




      </div>

    ) : (
        <div>
          <button
            className="btn btn-primary btn-block"
            onClick={this.handleOpenModal}
          >Login</button>
          <Modal
            {...this.props}
            bsSize="small"
            aria-labelledby="contained-modal-title-sm"
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            className="modal1"
          >
            <form className="mt-5 mb-2 d-flex justify-content-center align-items-center">
              <input
                onChange={this._handleTextChange}
                className="form-control"
                type="text"
                placeholder="Email"
              />
              <input
                onChange={this._handleTextChange1}
                className="form-control"
                type="password"
                placeholder="Password"
              />

            </form>
            <div class="mt-2 d-flex justify-content-center align-items-center">
              <button class="btn btn-primary " onClick={this.handleCloseModal}
                onClick={this.props.onLogin}>Đăng nhập</button>
            </div>
            <div class="mt-2 d-flex justify-content-center align-items-center">
              <button class="btn btn-secondary" onClick={this.handleCloseModal}>Thoát</button>
            </div>

          </Modal>
        </div>
        // <button
        //   className="btn btn-primary btn-block"
        //   onClick={this.props.onLogin}
        // >
        //   Login
        // </button>

      );
    return <div className="ml-2 profile_panel text-right">{display}</div>;
  }
}

export default ProfilePanel;
