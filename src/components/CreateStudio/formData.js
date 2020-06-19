export const formFields = [
    {
        container: {
            key: "containerStudioName",
            className: "col-lg-6 mt-2",
        },
        label: {
            key: "labelStudioName",
            labelText: "Studio name:"
        },
        editableField: {
            key: "inputStudioName",
            tagName: "input",
            className: "input-field",
            elementType: "text",
            elementName: "studioName",
            placeholder: "Enter your studio name...",
            readOnly: false
        },
        errorMessage: {
            key: "divStudioName",
            constName: "studioName"
        }
    },
    {
        container: {
            key: "containerStudioDescription",
            className: "col-lg-6 mt-2",
        },
        label: {
            key: "labelStudioDescription",
            labelText: "Studio description:"
        },
        editableField: {
            key: "inputStudioDescription",
            tagName: "textarea",
            className: "studio-description",
            rows: 3,
            elementType: "text",
            elementName: "studioDescription",
            placeholder: "Enter your studio description...",
        },
        errorMessage: {
            key: "divStudioDescription",
            constName: "studioDescription"
        }
    },   
    {
        container: {
            key: "containerStudioStarRating",
            className: "col-lg-12 mt-2",
        },
        label: {
            key: "labelStudioStarRating",
            labelText: "Studio star rating:"
        },
        editableField: {
            tagName: "StarRatingComponent",
            className: "starRating",
            elementName: "studioStarRating",
            starCount: 5,
            value: "starRating",
            onClick: "onStarClick"
        }
    },
    {
        container: {
            key: "containerCountry",
            className: "col-lg-6 mt-2",
        },
        label: {
            key: "labelCountry",
            labelText: "Country:"
        },
        editableField: {
            key: "inputCountry",
            tagName: "input",
            className: "input-field",
            elementType: "text",
            elementName: "country",
            placeholder: "Enter country...",
            readOnly: false
        },
        errorMessage: {
            key: "divCountry",
            constName: "country"
        }
    },
    {
        container: {
            key: "containerCity",
            className: "col-lg-6 mt-2",
        },
        label: {
            key: "labelCity",
            labelText: "City:"
        },
        editableField: {
            key: "inputCity",
            tagName: "input",
            className: "input-field",
            elementType: "text",
            elementName: "city",
            placeholder: "Enter city...",
            readOnly: false
        },
        errorMessage: {
            key: "divCity",
            constName: "city"
        }
    },
    {
        container: {
            key: "containerStreet",
            className: "col-lg-6 mt-2",
        },
        label: {
            key: "labelStreet",
            labelText: "Street:"
        },
        editableField: {
            key: "inputStreet",
            tagName: "input",
            className: "input-field",
            elementType: "text",
            elementName: "street",
            placeholder: "Enter street...",
            readOnly: false
        },
        errorMessage: {
            key: "divStreet",
            constName: "street"
        }
    },
    {
        container: {
            key: "containerHouse",
            className: "col-lg-6 mt-2",
        },
        label: {
            key: "labelHouse",
            labelText: "House:"
        },
        editableField: {
            key: "inputHouse",
            tagName: "input",
            className: "input-field",
            elementType: "text",
            elementName: "house",
            placeholder: "Enter house number...",
            readOnly: false
        },
        errorMessage: {
            key: "divHouse",
            constName: "house"
        }
    },
    {
        container: {
            key: "containerLatLong",
            className: "col-lg-6 mt-2",
        },
        label: {
            key: "labelLatLong",
            labelText: "Google map coordinates (lat, long):"
        },
        editableField: {
            key: "inputLatLong",
            tagName: "input",
            className: "input-field",
            elementType: "text",
            elementName: "latLong",
            placeholder: "Enter latitude and longitude...",
            readOnly: true
        },
        errorMessage: {
            key: "divLatLong",
            constName: "latLong"
        }
    }
];

export const formButtons = [
    {
        wrapperKey: "divCHClose",
        button: {
            key: "buttonClose",
            name: "close",
            label: "Close",
            className: "btn btn-main-danger text-white create-studio-button",
            handleClick: "canLeaveForm"
        }
    },
    {
        wrapperKey: "divCHSubmit",
        button: {
            key: "buttonSubmit",
            name: "submit",
            label: "Submit",
            className: "btn ch-btn-primary text-white create-studio-button",
            handleClick: "createStudio"
        }
    }
];