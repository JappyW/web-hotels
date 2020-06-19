import React from "react";
import PropTypes from "prop-types";
import Modal from 'react-modal';
import './confirmationModal.scss';
import { MODAL_BUTTON, MODAL_BUTTON_KIND } from '../../../constants/buttons';
import { CONFIRMATION_MODAL_MESSAGES }  from '../../../constants/messages';

const {MODAL_TITLE, MODAL_MESSAGE} = CONFIRMATION_MODAL_MESSAGES;
export {MODAL_TITLE, MODAL_MESSAGE};

const DEFAULT_SINGLE_BUTTON = [{ 
    name: MODAL_BUTTON.OK, 
    kind: MODAL_BUTTON_KIND.SUCCESS 
}];
const MAX_BUTTONS_NUMBER = 2;

export class ConfirmationModal extends React.Component {
    static propTypes = {
        modalIsOpen: PropTypes.bool.isRequired,
        title: PropTypes.string,
        message: PropTypes.string.isRequired,
        buttons: PropTypes.array,
        isOpen: PropTypes.bool,
        onClose: PropTypes.func
    }

    static defaultProps = {
        title: MODAL_TITLE.INFORMATION,
        buttons: DEFAULT_SINGLE_BUTTON
    }

    constructor (props) {
        super(props);
        this.state = {modalIsOpen: false};
    }

    closeModal = (event) => {
        this.setState({ modalIsOpen: false });
        this.props.onClose(event.target.value);
    }

    getButtonClassName = (buttonsNumber, buttonKind) => {
        return `btn col-md-${buttonsNumber === 1? 6: 4} ch-btn-` + buttonKind
    }

    static getDerivedStateFromProps(nextProps){
        return {
            modalIsOpen : nextProps.modalIsOpen
        };
    }
    
    render() {
        const { title, message, buttons } = this.props;
        if (buttons.length > MAX_BUTTONS_NUMBER) {
            buttons.length = MAX_BUTTONS_NUMBER;
        }
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                className='confirmation-modal-styling'
                shouldCloseOnOverlayClick={false}
            >
                <div className="modal-dialog">
                    <div className="modal-content webstudios-modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            aria-label="Close"
                            onClick={this.closeModal}
                        >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p className="m-0">{message}</p>
                    </div>
                    <div className="modal-footer webstudios-modal-footer">
                        {buttons.map((button) => (
                            <button key={button.name}
                            className={this.getButtonClassName(buttons.length, button.kind)}
                                value={button.name}
                                onClick={this.closeModal}
                            >
                                {button.name}
                            </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

