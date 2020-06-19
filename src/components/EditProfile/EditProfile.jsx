import i18n from 'i18next';
import uploadIco from "../../../public/images/upload-ico.png";
import { withTranslation } from 'react-i18next';
import React, { Component } from "react";
import Button from "../reusableComponents/Button";
import PropTypes from "prop-types";
import { messages } from "../../constants/messages";
import {
  IMAGE_MIME_TYPES,
  NOT_VALID_IMAGE_FILE,
  MAX_FILE_SIZE_UPLOAD,
  DEFAULT_PROFILE_WIDTH,
  DEFAULT_PROFILE_URL
} from "../../constants";
import "./editProfile.scss";
import {
  USERPROFILE,
  INVALIDNAME,
  INVALIDSURNAME,
  MINIMUM_NUMBER_OF_SYMBOLS_FOR_NAME
} from "../../constants/authActionTypes";
const initialState = {
  errors: {
    name: "",
    surname: ""
  },
  name: name,
  surname: ""
};
const NAME = "name";
const SURNAME = "surname";

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateImageUpload = this.validateImageUpload.bind(this);
    this.parseFullname = this.parseFullname.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    this.parseFullname();
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      formData: {
        name: event.target[0].value,
        surname: event.target[1].value
      }
    });

    if (
      validateForm(this.state.errors) &&
      !this.props.errorMessage &&
      !this.props.uploadError
    ) {
      await this.validateImageUpload();
      await this.props.requestGetEditProfile(this.state.formData);
      if (!this.props.errorMessage) {
        this.props.showMyComponent(USERPROFILE);
      }
    }
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case NAME:
        errors.name =
          value.length > MINIMUM_NUMBER_OF_SYMBOLS_FOR_NAME ? "" : INVALIDNAME;
        this.setState({
          name: name
        });
        break;
      case SURNAME:
        errors.surname =
          value.length < MINIMUM_NUMBER_OF_SYMBOLS_FOR_NAME
            ? INVALIDSURNAME
            : "";
        this.setState({
          surname: surname
        });
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  async parseFullname() {
    if (this.props.user.fullname) {
      const arrayOfFullname = await this.props.user.fullname.split(" ");
      this.setState({
        name: arrayOfFullname[0],
        surname: arrayOfFullname[1]
      });
    } else {
      this.setState({
        name: "",
        surname: ""
      });
    }
  }

  async validateImageUpload() {
    if (this.props.file) {
      await this.props.uploadFiles(this.props.file, this.props.user.id);
    }
  }

  handleLoadLocalFile(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    const imgMimeTypes = Array.from(IMAGE_MIME_TYPES, x => x);

    const nulledMimeTypes = imgMimeTypes.map(mimeType => {
      if (mimeType !== file.type) {
        return null;
      }
    });

    const validType = nulledMimeTypes.filter(mimeType => mimeType !== null);
    if (validType.length === 0) {
      this.props.uploadFilesFailed(NOT_VALID_IMAGE_FILE);
      return;
    }
    if (file.size > MAX_FILE_SIZE_UPLOAD) {
      this.props.uploadFilesFailed(messages.FILE_TO_LARGE);
      return;
    }
    this.props.clearReduxField();
    reader.onloadend = () => this.props.onFileLoaded(reader.result);
    reader.readAsDataURL(file);
  }

  render() {
    const { file, image, uploadError } = this.props;
    const { errors } = this.state;
    const fileSizeRestriction = "500KB";
    return (
      <div className='container m-0 text-center'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <img
              src={file !== null ? file : image || DEFAULT_PROFILE_URL}
              alt='Profile Image'
              className='img-fluid mx-auto d-block mb-2'
              width={DEFAULT_PROFILE_WIDTH}
            />
            <form
              className='form-group'
              onSubmit={this.handleSubmit}
              encType='multipart/form-data'>
              <div className='form-group'>
                <label htmlFor='name' className='font-weight-bold'>
                  {i18n.t('ENTER YOUR NAME')}
                </label>
                <input
                  name='name'
                  type='text'
                  id='name'
                  placeholder={i18n.t('NAME')}
                  className='form-control mb-3'
                  defaultValue={this.state.name}
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className='form-group'>
                <label htmlFor='surname' className='font-weight-bold'>
                  {i18n.t('ENTER YOUR SURNAME')}
                </label>
                <input
                  name='surname'
                  type='text'
                  id='surname'
                  placeholder={i18n.t('SURNAME')}
                  className='form-control mb-3'
                  defaultValue={this.state.surname}
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className='form-group text-center'>
                <label
                  className='font-weight-bold custom-file-upload'
                  htmlFor="file-upload"
                >
                  <img src={uploadIco} alt="upload-image" className="d-inline-block mr-2 upload-ico" />
                  {i18n.t('CHOOSE YOUR PREFERABLE IMAGE')}
                </label>
                <input
                  type='file'
                  id="file-upload"
                  name='profileImage'
                  onChange={event => this.handleLoadLocalFile(event)}
                  className='form-control-file'
                />
                <div className='info mt-3'>
                  <div
                    className="info-warning-block">
                    {`${i18n.t('MAXIMUM SIZE OF UPLOADED FILES IS')} ${fileSizeRestriction}`}
                  </div>

                  {uploadError === "" ? null : (
                    <div
                      message={uploadError}
                      alertStyle='alert-danger'
                    />
                  )}
                </div>
              </div>
              {errors.name.length > 0 && (
                <div className='alert alert-danger'>{errors.name}</div>
              )}
              {errors.surname.length > 0 && (
                <div className='alert alert-danger'>{errors.surname}</div>
              )}
              {this.props.errorMessage ? (
                <div className='alert alert-danger'>
                  {this.props.errorMessage}
                </div>
              ) : null}
              <div className='row justify-content-between controls mx-0'>
                <Button
                  type='submit'
                  label={i18n.t('SAVE')}
                  className='btn ch-btn-primary w-45 '
                  disabled={!!uploadError}
                />
                <Button
                  type='button'
                  label={i18n.t('CANCEL')}
                  className='btn ch-btn-danger w-45 '
                  handleClick={() => this.props.showMyComponent(USERPROFILE)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  clearReduxField: PropTypes.func,
  errorMessage: PropTypes.string,
  requestGetEditProfile: PropTypes.func,
  handleSubmit: PropTypes.func,
  showMyComponent: PropTypes.func,
  uploadFilesFailed: PropTypes.func,
  onFileLoaded: PropTypes.func,
  uploadFiles: PropTypes.func,
  uploadError: PropTypes.string,
  user: PropTypes.object,
  image: PropTypes.any,
  file: PropTypes.any,
};

export default withTranslation()(EditProfile);
