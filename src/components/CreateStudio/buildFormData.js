export const MAX_STAR_COUNT = 5;
export const COMMON_FIELD_DATA = {
    tagName: {
        input: 'input',
        starRatingComponent: 'StarRatingComponent',
        textarea: 'textarea'
    },
    className: {
        fieldLabel: 'create-studio-input-field-label',
        divInvalidField: 'div-invalid-field'
    }
}

export const FORM_FIELDS = [
    {
        container: {
            key: 'containerStudioName',
            className: 'col-lg-6 mt-2',
        },
        label: {
            key: 'labelStudioName',
            labelText: 'Studio name:'
        },
        editableField: {
            key: 'inputStudioName',
            tagName: COMMON_FIELD_DATA.tagName.input,
            className: 'input-field',
            elementType: 'text',
            elementName: 'name',
            placeholder: 'Enter your studio name...',
            readOnly: false
        },
        errorMessage: {
            key: 'divStudioName',
            constName: 'name'
        }
    },
    {
        container: {
            key: 'containerStudioDescription',
            className: 'col-lg-6 mt-2',
        },
        label: {
            key: 'labelStudioDescription',
            labelText: 'Studio description:'
        },
        editableField: {
            key: 'inputStudioDescription',
            tagName: COMMON_FIELD_DATA.tagName.textarea,
            className: 'studio-description',
            rows: 3,
            elementType: 'text',
            elementName: 'description',
            placeholder: 'Enter your studio description...',
        },
        errorMessage: {
            key: 'divStudioDescription',
            constName: 'description'
        }
    },
    {
        container: {
            key: 'containerStudioStarRating',
            className: 'col-lg-12 mt-2 star-rating-container',
        },
        label: {
            key: 'labelStudioStarRating',
            labelText: 'Studio star rating:'
        },
        editableField: {
            tagName: COMMON_FIELD_DATA.tagName.starRatingComponent,
            className: 'starRating',
            elementName: 'studioStarRating',
            starCount: MAX_STAR_COUNT,
            value: 'starRating',
            onClick: 'onStarClick'
        }
    },
    {
        container: {
            key: 'containerCountry',
            className: 'col-lg-6 mt-2',
        },
        label: {
            key: 'labelCountry',
            labelText: 'Country:'
        },
        editableField: {
            key: 'inputCountry',
            tagName: 'input',
            className: 'input-field',
            elementType: 'text',
            elementName: 'country',
            placeholder: 'Enter country...',
            readOnly: false
        },
        errorMessage: {
            key: 'divCountry',
            constName: 'country'
        }
    },
    {
        container: {
            key: 'containerCity',
            className: 'col-lg-6 mt-2',
        },
        label: {
            key: 'labelCity',
            labelText: 'City:'
        },
        editableField: {
            key: 'inputCity',
            tagName: 'input',
            className: 'input-field',
            elementType: 'text',
            elementName: 'city',
            placeholder: 'Enter city...',
            readOnly: false
        },
        errorMessage: {
            key: 'divCity',
            constName: 'city'
        }
    },
    {
        container: {
            key: 'containerStreet',
            className: 'col-lg-6 mt-2',
        },
        label: {
            key: 'labelStreet',
            labelText: 'Street:'
        },
        editableField: {
            key: 'inputStreet',
            tagName: COMMON_FIELD_DATA.tagName.input,
            className: 'input-field',
            elementType: 'text',
            elementName: 'street',
            placeholder: 'Enter street...',
            readOnly: false
        },
        errorMessage: {
            key: 'divStreet',
            constName: 'street'
        }
    },
    {
        container: {
            key: 'containerHouse',
            className: 'col-lg-6 mt-2',
        },
        label: {
            key: 'labelHouse',
            labelText: 'House:'
        },
        editableField: {
            key: 'inputHouse',
            tagName: COMMON_FIELD_DATA.tagName.input,
            className: 'input-field',
            elementType: 'text',
            elementName: 'house',
            placeholder: 'Enter house number...',
            readOnly: false
        },
        errorMessage: {
            key: 'divHouse',
            constName: 'house'
        }
    }
];

export const FORM_BUTTONS = [
    {
        wrapperKey: 'wrapper_divClose',
        button: {
            key: 'buttonClose',
            name: 'close',
            label: 'Close',
            className: 'btn ch-btn-danger create-studio-button',
            handleClick: 'canLeaveForm',
        }
    },
    {
        wrapperKey: 'wrapper_divSubmit',
        button: {
            key: 'buttonSubmit',
            name: 'submit',
            label: 'Submit',
            className: 'btn ch-btn-success create-studio-button',
            handleClick: 'createStudio',
        }
    }
];
