import React from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

export class SendOwnerMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = event => {
    const e = {
      email: this.props.email,
      message: event.message
    };

    this.props.sendOwnerMessage(e);

    this.props.updateStatusStudio({
      id: this.props.id,
      status: this.props.status
    });

    this.props.closeModal();
  };

  render() {
    const { handleSubmit, email, closeModal } = this.props;

    return (
      <>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label className="font-weight-bold" htmlFor="email">
              Email owner
            </label>
            <input
              name="email"
              label="Enter email owner"
              type="email"
              className="form-control"
              disabled
              defaultValue={email}
            />
            <label className="font-weight-bold mt-3" htmlFor="message">
              Message
            </label>
            <Field
              cols="5"
              rows="5"
              name="message"
              className="form-control"
              placeholder="What you wont to send?"
              component="textarea"
            />
          </fieldset>
          <div className="d-flex justify-content-end mt-2">
            <button className="btn ch-btn-primary" type="submit">
              Send
            </button>
            <button
              type="button"
              className="btn ch-btn-danger ml-2"
              onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </>
    );
  }
}

SendOwnerMessageForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendOwnerMessageForm: PropTypes.func,
  sendOwnerMessage: PropTypes.func,
  email: PropTypes.string,
  closeModal: PropTypes.func,
  updateStatusStudio: PropTypes.func,
  id: PropTypes.number,
  status: PropTypes.string
};

export default SendOwnerMessageForm;