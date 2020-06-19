import { combineReducers } from "redux";
import studios from "./studiosReducer";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboard";
import bookingReducer from "./bookings";
import studioDetailsReducer from "./studioDetails";
import createStudioReducer from "./createStudioReducer";
import adminReducer from "./adminReducer";
import upload from './uploadFile';
import feedbacksReducer from "./feedbacksReducer";
import userCabinetOrders from "./userCabinetOrdersReducer";
import studioManagementReducer from "./studioManagementReducer";
import manageStudioRoomsReducer from  "./manageStudioRoomsReducer";

const rootReducers = combineReducers({
  bookingReducer,
  studios,
  studioDetailsReducer,
  form: formReducer,
  auth: authReducer,
  dash: dashboardReducer,
  createStudioReducer,
  adminReducer,
  upload,
  feedbacksReducer,
  userCabinetOrders,
  studioManagementReducer,
  manageStudioRoomsReducer
});

export default rootReducers;
