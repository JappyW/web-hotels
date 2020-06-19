import { ordersAction, feedbacksActions } from "./actionTypes";
import { messages } from "./messages";
import { searchParams, SEARCH, ORDERS, ADD } from "./searchParametres";

export const exportSearchParams = searchParams;
export const exportOrdersAction = ordersAction;
export const exportMessages = messages;
export const EXPORT_SEARCH = SEARCH;
export const EXPORT_ORDERS = ORDERS + ADD;

export const MAX_FILE_SIZE_UPLOAD = 0.5 * 1024 * 1024;
export const DEFAULT_PROFILE_WIDTH = "200";
export const DEFAULT_PROFILE_URL =
  "https://www.kuwera.id/assets/img/default.png";
export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp"
];
export const NOT_VALID_IMAGE_FILE = "It looks like it's not valid image type!";
export const exportfeedbacksActions = feedbacksActions;
export const NOT_VALID_PAGE = "There are no studios for this data!";
export const DEFAULT_STUDIO_URL =
  "https://www.dyson.in/media/dyson/assurances/default/home-trial.png";

export const FULLNAME_INCOGNITO = "https://www.computerra.ru/wp-content/uploads/2018/12/Incognito.png?x77688";

export const DEFAULT_STUDIO_IMAGE =
"https://www.palladiumstudiogroup.es/_ui/responsive/theme-palladium/images/default-img.png";
