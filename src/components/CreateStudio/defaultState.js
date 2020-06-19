export const DEFAULT_STATE = {
    confirmationModalIsOpen: false,
    informationModalIsOpen: false,
    submitIsDisabled: true,
    postResult: '',
    name: "",
    description: "",
    starRating: 1,
    country: "",
    city: "",
    street: "",
    house: "",
    latLong: "",
    location: {},
    touched: {
        name: false,
        description: false,
        country: false,
        city: false,
        street: false,
        house: false
    },
    isValid: {
        name: true,
        description: true,
        country: true,
        city: true,
        street: true,
        house: true
    }
};
