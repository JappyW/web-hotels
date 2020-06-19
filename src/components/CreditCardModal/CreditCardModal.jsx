import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import ReactCreditCards from "../ReactCreditCards/ReactCreditCards.jsx";

class CreditCardModal extends React.Component {
  static propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      confirmationModalIsOpen: false
    };
  }
  onSubmit(formData) {
    this.setState({
      card: formData
    });
    this.props.onPaymentSubmit(formData)
  }
  handleClose() {
    this.setState({
      confirmationModalIsOpen: false
    });
    this.props.handleClose();
  }

  openConfirmationModal = () => {
    this.setState({
      confirmationModalIsOpen: true
    });
  };

  closeConfirmationModal = () => {
    this.setState({
      confirmationModalIsOpen: false
    });
  };

  render() {
    const { title } = this.props;
    return (
      <div className='credit-card-modal'>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.closeModal}
          className='confirmation-modal-styling'
          shouldCloseOnOverlayClick={false}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{title}</h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={this.openConfirmationModal}>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <ReactCreditCards
                  onSubmit={this.onSubmit}
                  handleClose={this.handleClose}
                  openConfirmationModal={this.openConfirmationModal}
                />
                {this.props.errorMessage ? (
                <div className='alert alert-danger text-center'>
                  {this.props.errorMessage}
                </div>
              ) : null}
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.confirmationModalIsOpen}
          onRequestClose={this.closeConfirmationModal}
          className='confirmation-modal-styling'
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={this.closeConfirmationModal}>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Your data will be lost, procceed?</p>
              </div>
              <div className='modal-footer'>
                <button
                  className='btn ch-btn-danger '
                  onClick={this.handleClose}>
                  Ok
                </button>
                <button
                  className='btn ch-btn-primary '
                  onClick={this.closeConfirmationModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

CreditCardModal.propTypes = {
  onPaymentSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  errorMessage: PropTypes.string
}
export default CreditCardModal;
