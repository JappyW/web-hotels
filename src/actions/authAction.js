import {
  REQUEST_AUTH_GOOGLE,
  REQUEST_AUTH_SIGN_IN,
  RECEIVE_AUTH_SIGN_IN,
  REQUEST_AUTH_SIGN_UP,
  RECEIVE_AUTH_SIGN_UP,
  REQUEST_AUTH_CHECK,
  REQUEST_AUTH_SIGN_OUT,
  RECEIVE_AUTH_SIGN_OUT,
  REQUEST_AUTH_CREDENTIALS,
  RECEIVE_AUTH_CREDENTIALS,
  REQUEST_PROFILE_CREDENTIALS,
  RECEIVE_PROFILE_CREDENTIALS,
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA,
  REQUEST_AUTH_SIGNED_IN,
  REQUEST_DASHBOARD_DATA,
  RECEIVE_DASHBOARD_DATA,
  REQUEST_EDIT_PROFILE,
  RECEIVE_EDIT_PROFILE,
  REQUEST_VERIFY_USER,
  RECEIVE_VERIFY_USER,
  REQUEST_VERIFICATION_EMAIL,
  REQUEST_GET_USER_PROFILE_URL,
  REQUEST_CHANGE_PASSWORD,
  RECEIVE_CHANGE_PASSWORD,
  REQUEST_PASSWORD_VALIDATE,
  RECEIVE_PASSWORD_VALIDATE,
  REQUEST_SEND_RECOVERY,
  RECEIVE_SEND_RECOVERY,
  REQUEST_PASSWORD_RECOVER,
  RECEIVE_PASSWORD_RECOVER,
  REQUEST_PASSWORD_RECOVER_VALIDATE,
  RECEIVE_PASSWORD_RECOVER_VALIDATE,
} from "../constants/authActionTypes";



export const requestOAuthGoogle = payload => ({
  type: REQUEST_AUTH_GOOGLE,
  payload
});
export const receiveOAuthGoogle = payload => ({
  type: RECEIVE_AUTH_SIGN_IN,
  payload
});

export const requestSignIn = payload => ({
  type: REQUEST_AUTH_SIGN_IN,
  payload
});
export const receiveSignIn = payload => ({
  type: RECEIVE_AUTH_SIGN_IN,
  payload
});

export const requestSignUp = payload => ({
  type: REQUEST_AUTH_SIGN_UP,
  payload
});
export const receiveSignUp = payload => ({
  type: RECEIVE_AUTH_SIGN_UP,
  payload
});

export const requestCheckAuth = () => ({
  type: REQUEST_AUTH_CHECK
});
export const receiveCheckAuth = () => ({
  type: RECEIVE_AUTH_SIGN_IN
});

export const requestSignOut = () => ({
  type: REQUEST_AUTH_SIGN_OUT
});
export const receiveSignOut = () => ({
  type: RECEIVE_AUTH_SIGN_OUT
});

export const requestValidationAuth = payload => ({
  type: REQUEST_AUTH_CREDENTIALS,
  payload
});
export const receiveValidationAuth = payload => ({
  type: RECEIVE_AUTH_CREDENTIALS,
  payload
});

export const requestValidationProfile = payload => ({
  type: REQUEST_PROFILE_CREDENTIALS,
  payload
});
export const receiveValidationProfile = payload => ({
  type: RECEIVE_PROFILE_CREDENTIALS,
  payload
});

export const requestValidationPassword = payload => ({
  type: REQUEST_PASSWORD_VALIDATE,
  payload
});
export const receiveValidationPassword = payload => ({
  type: RECEIVE_PASSWORD_VALIDATE,
  payload
});


export const requestValidationRecoverPassword = payload => ({
  type: REQUEST_PASSWORD_RECOVER_VALIDATE,
  payload
})
export const receiveValidationRecoverPassword = () => ({
  type: RECEIVE_PASSWORD_RECOVER_VALIDATE
})

export const requestDispatchAuthSignedIn = () => ({
  type: REQUEST_AUTH_SIGNED_IN
});
export const receiveDispatchAuthSignedIn = payload => ({
  type: RECEIVE_AUTH_SIGN_IN,
  payload
});

export const requestGetUserData = () => ({
  type: REQUEST_USER_DATA
});
export const receiveGetUserData = payload => ({
  type: RECEIVE_USER_DATA,
  payload
});

export const requestGetDashboard = () => ({
  type: REQUEST_DASHBOARD_DATA
});
export const receiveGetDashboard = payload => ({
  type: RECEIVE_DASHBOARD_DATA,
  payload
});

export const requestGetEditProfile = payload => ({
  type: REQUEST_EDIT_PROFILE,
  payload
});
export const receiveGetEditProfile = payload => ({
  type: RECEIVE_EDIT_PROFILE,
  payload
});

export const requestChangePassword = payload => ({
  type: REQUEST_CHANGE_PASSWORD,
  payload
});

export const receiveChangePassword = payload => ({
  type: RECEIVE_CHANGE_PASSWORD,
  payload
});

export const requestVerifyUser = payload => ({
  type: REQUEST_VERIFY_USER,
  payload
});
export const receiveVerifyUser = payload => ({
  type: RECEIVE_VERIFY_USER,
  payload
});

export const requestVerificationEmail = payload => ({
  type: REQUEST_VERIFICATION_EMAIL,
  payload
});
export const receiveVerificationEmail = payload => ({
  type: RECEIVE_DASHBOARD_DATA,
  payload
})

export const requestSendRecoveryEmail = payload => ({
  type: REQUEST_SEND_RECOVERY,
  payload
})
export const receiveSendRecoveryEmail = () => ({
  type: RECEIVE_SEND_RECOVERY
})

export const requestRecoverPassword = payload => ({
  type: REQUEST_PASSWORD_RECOVER,
  payload
})
export const receiveRecoverPassword = () => ({
  type: RECEIVE_PASSWORD_RECOVER
})

export const getUserProfileUrl = payload => ({
  type: REQUEST_GET_USER_PROFILE_URL,
  payload
});

export const receiveImageProfile = payload => ({
  type: RECEIVE_IMAGE_PROFILE,
  payload
});

export const uploadActionCreators = {
  uploadFiles: (base64String, id) => {
    return {
      type: UPLOAD_ACTIONS.UPLOAD_FILES,
      payload: {
        base64String,
        id
      }
    };
  },

  uploadFilesStart: () => ({ type: UPLOAD_ACTIONS.UPLOAD_FILES_START }),

  uploadFilesSuccess: result => ({
    type: UPLOAD_ACTIONS.UPLOAD_FILES_SUCCESS,
    payload: {
      result
    }
  }),

  uploadFilesFailed: error => ({
    type: UPLOAD_ACTIONS.UPLOAD_FILES_FAILED,
    payload: {
      error
    },
    error: true
  }),

  uploadFilesProgress: progress => ({
    type: UPLOAD_ACTIONS.UPLOAD_FILES_PROGRESS,
    payload: {
      progress
    }
  })
};
