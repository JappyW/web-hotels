import React, { Component } from "react";
import PropTypes from 'prop-types';
import './createStudio.scss';
import Button from '../reusableComponents/Button';
import StarRatingComponent from 'react-star-rating-component';
import { FORM_FIELDS, FORM_BUTTONS, COMMON_FIELD_DATA } from './buildFormData';
import { MODAL_BUTTON, MODAL_BUTTON_KIND } from '../../constants/buttons';
import { DEFAULT_STATE } from './defaultState';
import { ConfirmationModal, MODAL_TITLE, MODAL_MESSAGE } from '../reusableComponents/ConfirmationModal/ConfirmationModal.jsx';
import Map from '../reusableComponents/Map/Map.jsx'
import { ZOOM, MAP_HEIGHT, CENTER_LNG, CENTER_LAT } from "../../constants/actionTypes";
import { CREATE_STUDIO_MESSAGES } from '../../constants/messages';

const { STUDIO_CREATED, ERROR_MESSAGE } = CREATE_STUDIO_MESSAGES;
const VALID_FIELD_CLASS_NAME = ' form-control';
const ERROR_FIELD_CLASS_NAME = VALID_FIELD_CLASS_NAME + '-error';
const ADDRESS_FIELDS_ARRAY = ['country', 'city', 'street', 'house', 'latLong'];
const STUDIO_FIELDS_ARRAY = ['name', 'description'];
const FORM_FIELDS_ARRAY = [...ADDRESS_FIELDS_ARRAY, ...STUDIO_FIELDS_ARRAY, 'starRating'];

class CreateStudio extends Component {
    static propTypes = {
        requestPOSTCreateStudio: PropTypes.func.isRequired,
        postResult: PropTypes.string,
        onLeaveCreateStudio: PropTypes.func,
        google: PropTypes.object,
        userId: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    getLatLong = ({ lat, lng }) => {
        return [lat, lng].join(',').toString();
    }

    onMapChange = (state) => {
        this.setState(state);
        this.setState({ ['latLong']: this.getLatLong(this.state.location) });
        ADDRESS_FIELDS_ARRAY.forEach((item) => {
            this.markFieldAsTouchedOne(item);
        });
    }

    checkHouse = (value) => {
        return /^[1-9][0-9]*([a-z]|[а-я]|(\/[1-9][0-9]*))?$/i.test(value);
    }

    validate = (name, value) => {
        let isValidValue;
        isValidValue = (name === 'house') ? this.checkHouse(value) : value.length > 1;
        this.setState({
            isValid: { ...this.state.isValid, [name]: isValidValue }
        });
    }

    onStarClick = (nextValue) => {
        this.setState({ starRating: nextValue });
        this.markFieldAsTouchedOne('starRating');
    }

    createStudio = (event) => {
        event.preventDefault();
        this.setState({ postResult: '' });
        let studio = {};
        FORM_FIELDS_ARRAY.forEach((item) => {
            studio[item] = this.state[item];
        });
        studio.ownerId = this.props.userId;
        this.props.requestPOSTCreateStudio(studio);
        this.openInformationModal();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.postResult !== this.props.postResult) {
            this.setState({
                postResult: this.props.postResult
            });
        }
    }

    setInputFieldValue = (inputField) => {
        return ADDRESS_FIELDS_ARRAY.includes(inputField) ? this.state[inputField] : undefined;
    }

    handleFormFieldChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
        ADDRESS_FIELDS_ARRAY.includes(name) && this.markFieldAsTouchedOne(name);
        this.validate(name, value);
        this.setState({ submitIsDisabled: !this.canBeSubmitted() });
    }

    markFieldAsTouchedOne = (fieldName) => {
        if (this.state.touched.hasOwnProperty(fieldName)) {
            (!this.state.touched[fieldName]) && this.setState({
                touched: { ...this.state.touched, [fieldName]: true }
            });
        }
    }

    handleBlur = (event) => {
        this.markFieldAsTouchedOne(event.target.name)
    }

    canBeSubmitted = () => {
        const allFieldsAreTouched = Object.keys(this.state.touched).every(
            (field) => this.state.touched[field]
        );
        const allFieldsIsValid = Object.keys(this.state.isValid).every(
            (field) => this.state.isValid[field]
        );
        return allFieldsAreTouched && allFieldsIsValid;
    }

    openConfirmationModal = () => {
        this.setState({ confirmationModalIsOpen: true });
    }

    canLeaveForm = () => {
        const someFieldIsTouched = Object.keys(this.state.touched).some(
            (field) => this.state.touched[field]
        );
        return someFieldIsTouched ? this.openConfirmationModal() : this.leaveForm();
    }

    leaveForm = () => {
        this.props.onLeaveCreateStudio();
    }

    getErrorMessage = (formField) => {
        return this.state.isValid[formField] ? '' : ERROR_MESSAGE[formField];
    }

    getFieldStatus = (formField) => {
        return this.state.isValid[formField] ? VALID_FIELD_CLASS_NAME : ERROR_FIELD_CLASS_NAME;
    }

    getSubmitStatus = (buttonName) => {
        return (buttonName === 'submit') ? !this.canBeSubmitted() : false;
    }

    handleConfirmModalResult = (usersChoise) => {
        this.setState({ confirmationModalIsOpen: false });
        (usersChoise === MODAL_BUTTON.OK) && this.leaveForm();
    }

    openInformationModal = () => {
        this.setState({ postResult: this.props.postResult, informationModalIsOpen: true });
    }

    handleInformationModalResult = () => {
        this.setState({ informationModalIsOpen: false });
        this.leaveForm();
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            postResult: nextProps.postResult
        };
    }

    renderConfirmationModals = () => (
        <>
            <ConfirmationModal
                modalIsOpen={this.state.confirmationModalIsOpen}
                title={MODAL_TITLE.CONFIRMATION}
                message={MODAL_MESSAGE.CHANGES_CAN_BE_LOST}
                buttons={[
                    { name: MODAL_BUTTON.OK, kind: MODAL_BUTTON_KIND.DANGER },
                    { name: MODAL_BUTTON.CANCEL, kind: MODAL_BUTTON_KIND.SUCCESS }
                ]}
                onClose={this.handleConfirmModalResult}
            >
            </ConfirmationModal>
            <ConfirmationModal
                modalIsOpen={this.state.informationModalIsOpen}
                message={STUDIO_CREATED}
                onClose={this.handleInformationModalResult}
            >
            </ConfirmationModal>
        </>
    )

    renderInput = (formItem, formFieldLabel, divInvalidField) => {
        const { container, editableField, label, errorMessage } = formItem;
        return (
            <div key={container.key} className={container.className} >
                <label key={label.key} className={formFieldLabel}> {label.labelText} </label>
                <input key={editableField.key}
                    type={editableField.elementType}
                    name={editableField.elementName}
                    className={editableField.className + this.getFieldStatus(editableField.elementName)}
                    placeholder={editableField.placeholder}
                    onChange={this.handleFormFieldChange}
                    onBlur={this.handleBlur}
                    readOnly={editableField.readOnly}
                    value={this.setInputFieldValue(editableField.elementName)}
                />
                <div key={errorMessage.key} className={divInvalidField}>
                    {this.getErrorMessage(errorMessage.constName)}
                </div>
            </div>
        );
    }

    renderstarRatingComponent = (formItem, formFieldLabel) => {
        const { container, editableField, label } = formItem;
        return (
            <div key={container.key} className={container.className}>
                <label key={label.key} className={formFieldLabel}>{label.labelText}</label>
                <StarRatingComponent className={editableField.className}
                    name={editableField.elementName}
                    starCount={editableField.starCount}
                    value={this.state[editableField.value]}
                    onStarClick={this[editableField.onClick]}
                />
            </div>
        );
    }

    renderTextArea = (formItem, formFieldLabel, divInvalidField) => {
        const { container, editableField, label, errorMessage } = formItem;
        return (
            <div key={container.key} className={container.className} >
                <label key={label.key} className={formFieldLabel}>{label.labelText}</label>
                <textarea rows={editableField.rows} key={editableField.key}
                    type={editableField.elementType}
                    name={editableField.elementName}
                    className={editableField.className + this.getFieldStatus(editableField.elementName)}
                    placeholder={editableField.placeholder}
                    onChange={this.handleFormFieldChange}
                    onBlur={this.handleBlur}
                />
                <div key={errorMessage.key} className={divInvalidField}>
                    {this.getErrorMessage(formItem.errorMessage.constName)}
                </div>
            </div>
        );
    }

    renderMap = () => (
        <Map
            mapGetStateToParent={this.onMapChange}
            mapState={this.state}
            google={this.props.google}
            center={{ lat: CENTER_LAT, lng: CENTER_LNG }}
            height={MAP_HEIGHT}
            zoom={ZOOM}
            readOnly={true}
            autocomplete={true}
        />
    )


    renderFormButtons = () => (
        FORM_BUTTONS.map(
            (formButton) => (
                <div key={formButton.wrapperKey}
                    className="col-6 offset-lg-2 col-lg-3">
                    <Button
                        name={formButton.button.name}
                        type='button'
                        label={formButton.button.label}
                        className={formButton.button.className}
                        handleClick={this[formButton.button.handleClick]}
                        disabled={this.getSubmitStatus(formButton.button.name)}
                    />
                </div>
            )
        )
    )

    render() {
        const { tagName: fieldTag, className: fieldClass } = COMMON_FIELD_DATA;
        const { fieldLabel: formFieldLabel, divInvalidField: divInvalidField } = fieldClass;
        return (
            <div>
                {this.renderConfirmationModals()}
                <div className='row justify-content-md-center'>
                    <form className='form-group form-style create-studio-form' onSubmit={this.handleSubmit}>
                        <div className='row'>
                            {FORM_FIELDS.map(
                                (formItem) => {
                                    switch (formItem.editableField.tagName) {
                                        case fieldTag.input:
                                            return this.renderInput(formItem, formFieldLabel, divInvalidField);
                                        case fieldTag.starRatingComponent:
                                            return this.renderstarRatingComponent(formItem, formFieldLabel, divInvalidField);
                                        case fieldTag.textarea:
                                            return this.renderTextArea(formItem, formFieldLabel, divInvalidField);
                                    }
                                })}
                        </div >
                        <div className='map-wrapper py-2'>
                            {this.renderMap()}
                        </div>
                        <div className='create-studio-form-button-wrapper'>
                            {this.renderFormButtons()}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateStudio;
