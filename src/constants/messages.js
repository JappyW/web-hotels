export const messages = {
  ERROR_MESSAGE:
    "Sorry, this date pair is currently unavailable. Please choose another one :(",
  DATE_DIFFENCE_ERROR:
    "'Date to arrive' can't be equal or greater than 'Date to leave'",
  FILE_TO_LARGE: "File size is to large! Choose another image!",
  SUCCESS_MESSAGE: "Everything passed correctly!",
  ALLOWED_FILE_EXTENSIONS: "Only *.jpeg, *.webp, *.png images will be accepted!",
  INVALID_DATA_TYPE: "Not valid image type!"
};

// CreateStudio component messages
const INVALID_TEXT_FIELD = "must be at least 2 letters long";
export const CREATE_STUDIO_MESSAGES = {
  CREATE_STUDIO: "Create studio",
  STUDIO_CREATED: "The studio successfully created",
  ERROR_MESSAGE: {
    name: "Studio name " + INVALID_TEXT_FIELD,
    description: "Studio description " + INVALID_TEXT_FIELD,
    country: "Country " + INVALID_TEXT_FIELD,
    city: "City(town) " + INVALID_TEXT_FIELD,
    street: "Street name " + INVALID_TEXT_FIELD,
    house: "The house number must begin with numbers and may contain one letter at the end"
  },
  
}

// confirmationModal reusable component messages
export const CONFIRMATION_MODAL_MESSAGES = {
  MODAL_TITLE: {
    CONFIRMATION: "Confirmation",
    QUESTION: "Question",
    INFORMATION: "Information" 
  },
  MODAL_MESSAGE: {
    CHANGES_CAN_BE_LOST: "If you leave the form you loose all changes. Continue?",
    CONFIRM_CHANGE: "Are you sure you want to ",
  }
}

// ManageStudioRooms component messages
export const MANAGE_STUDIO_ROOMS_MESSAGES = {
    NO_ROOMS: "There are no rooms in this studio!",
    ADD_ROOM: "Add room"
}

// StudioManagement component messages
export const STUDIO_MANAGEMENT_MESSAGES = {
  NO_OWNER_STUDIOS: "No studios were found!",
}
