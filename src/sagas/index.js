import { all, fork } from "redux-saga/effects";
import uploadSaga from "./uploadSaga";
import { watcherGetStudios } from "./studioSaga";
import { watcherGetStudioDetails, watcherGetFeedbackByStudioId } from "./studioDetail";
import { watcherGetStudioComforts, watcherDeleteComforts, watcherCreateComfort } from "./comfortsSaga";
import { watcherGetOrders } from "./orderSaga";
import { watcherSearchStudios } from "./searchSaga";
import { watcherCreateStudio } from "./createStudioSaga";
import { watcherGetInactiveStudios } from "./adminSaga";
import {
  watcherGetOAuthGoogle,
  watcherGetSignIn,
  watcherGetSignUp,
  watcherGetCheckAuth,
  watcherGetSignOut,
  watcherDispatchAuthSignedIn,
  watcherGetUserData,
  watcherGetDashboard,
  watcherGetEditProfile,
  watcherVerifyUser,
  watcherGetVerificationEmail,
  watcherGetChangePassword,
  watcherGetValidationPassword,
  watcherGetSendRecoveryEmail,
  watcherRecoverPassword,
} from "./authSaga";
import { watcherGetUserOrders, watcherGetUserFeedbacks, watcherAddUserFeedback } from "./feedbacksSaga";
import { watcherGetPayForOrder, watcherGetUserCabinetCreatedOrders, watcherGetUserCabinetPaidOrders, watcherGetUserCabinetCompletedOrders, watcherGetOwnerOrders } from "./listOfUserOrdersSaga";
import { watcherGetStudioRooms } from "./manageStudioRoomsSaga";
import { watcherGetListOwnerStudios } from "./studioManagementSaga";


export default function* rootSaga() {
  yield all([
    fork(watcherGetStudios),
    fork(watcherGetStudioDetails),
    fork(watcherGetFeedbackByStudioId),
    fork(watcherGetOrders),
    fork(watcherSearchStudios),
    fork(watcherCreateStudio),
    fork(watcherGetOAuthGoogle),
    fork(watcherGetSignIn),
    fork(watcherGetSignUp),
    fork(watcherGetCheckAuth),
    fork(watcherGetSignOut),
    fork(watcherDispatchAuthSignedIn),
    fork(watcherGetUserData),
    fork(watcherGetDashboard),
    fork(watcherGetEditProfile),
    fork(watcherVerifyUser),
    fork(watcherGetVerificationEmail),
    fork(watcherGetUserOrders),
    fork(watcherGetUserFeedbacks),
    fork(watcherAddUserFeedback),
    fork(watcherGetInactiveStudios),
    fork(watcherGetChangePassword),
    fork(watcherGetUserOrders),
    fork(watcherGetSendRecoveryEmail),
    fork(watcherRecoverPassword),
    fork(watcherGetValidationPassword),
    fork(uploadSaga),
    fork(watcherGetUserCabinetCreatedOrders),
    fork(watcherGetUserCabinetPaidOrders),
    fork(watcherGetUserCabinetCompletedOrders),
    fork(watcherGetPayForOrder),
    fork(watcherGetStudioComforts),
    fork(watcherDeleteComforts),
    fork(watcherCreateComfort),
    fork(watcherGetStudioRooms),
    fork(watcherGetListOwnerStudios),
    fork(watcherGetOwnerOrders)
  ]);
}
