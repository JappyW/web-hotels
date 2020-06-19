import UserService from "../services/UserService";
import { validationResult, check } from "express-validator";
import * as fieldValidator from "../validators/fieldValidator";
import {
  validateResponse,
  util,
  validateResponseError
} from "./ResponseWrapper";
import UserModel from "../src/models/users";
import config from "../src/config/config";

const TOKENISALREADYACTIVATED =
  "This account is already activated, please log in.";
const USERLISTMESS = "Users List";
const USERNOTFOUNDMESS = "User has not been found";
const SIGNOUTMESS = "Signed out successfuly";
const EXPIREDTOKEN = "Token is expired. Please re-send actiovation token.";
const USERCREATED = "User has been created";
const USERSLIST = "Users list";
const EMAILWASVERIFIED = "Email was verified";
const USERWITHTOKENNOTFOUND = "User with this authToken was not found";
const USERISREGISTEREDMESS = "User is already registered";
const USERLOGGEDIN = "User has been logged in";
const USERSIGNEDOUT = "User has not been signed out";
const SUCCESSGOOGLE = "Successful google auth";
const FAILUREGOOGLE = "Google auth failed";
const CHANGEDFULLNAME = "Fullname was changed";
const CHANGEDPASSWORD = "Password was changed";
const PASSWORDDIDNTCHANGE = "Password was not changed";
const RECEIVEDUSER = "User data has been received";
const EMAILISNOTFOUND = "Email was not found";
const EMAILSENT = "Email was sent";
const GOTUSERORDERS = "User orders has been fetched succesfuly";
const tokenExpirationDate = "72h";
const STATUS = require("../constants/status.code.env");
const VALIDATION = require("../constants/controller.env");
const EnumForAuthTypeAndRoles = require("../constants/EnumForAuthTypeAndRoles");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
const CREATED = "CREATED";
const PAID = "PAID";
const COMPLETED = "COMPLETED";
const OWNER = "OWNER";

const USER_FIELDS = {
  id: "id",
  email: "email",
  fullname: "fullname",
  password: "password",
  authType: "authType",
  role: "role",
  activated: "activated",
  banned: "banned",
  authToken: "authToken"
};

class UserController {
  static async getAllUsers(res) {
    try {
      const users = await UserService.getAllUsers();
      validateResponse(users.length, users, USERSLIST);
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.BAD_REQUEST, e);
      return util.send(res);
    }
  }

  static checkUsersCredentials() {
    return [
      ...fieldValidator.checkString(USER_FIELDS.email, { min: 6, max: 20 }),
      ...fieldValidator.checkString(USER_FIELDS.password, { min: 4, max: 20 })
    ];
  }

  static checkIfEmailExists() {
    return [
      check(USER_FIELDS.email).custom(fieldValidator.checkIfUserWithEmailExists)
    ];
  }

  static validate(method) {
    switch (method) {
      case VALIDATION.REGISTRATION_DATA:
        return this.checkUsersCredentials();
      case VALIDATION.LOGIN_DATA:
        return this.checkIfEmailExists();
    }
  }

  static async signUp(req, res) {
    try {
      const { email, password } = req.body;
      const doesUserExist = await UserService.getUserByEmail(email);
      if (doesUserExist) {
        util.setError(STATUS.FORBIDDEN, USERISREGISTEREDMESS);
      } else {
        const authToken = randomstring.generate();
        UserService.sendRegisterEmailViaEmailBuilder(authToken, email);
        const userData = await UserService.createUserRecord({
          email: email,
          password: password,
          authType: EnumForAuthTypeAndRoles.local,
          role: EnumForAuthTypeAndRoles.USER,
          activated: false,
          banned: false,
          authToken: authToken,
          imageProfile: ""
        });

        const token = jwt.sign(
          {
            email: userData.email,
            authType: userData.authType,
            activated: userData.activated
          },
          config.production.JWT_SECRET,
          {
            expiresIn: tokenExpirationDate
          }
        );
        util.setSuccess(STATUS.SUCCESS, USERCREATED, {
          token,
          userData
        });
      }
      return util.send(res);
    } catch (e) {
      console.error(e);
      util.setError(STATUS.BAD_REQUEST, e);
      return util.send(res);
    }
  }

  static async verifyEmail(req, res) {
    //auth token taken from the url
    try {
      const URLAuthToken = req.params.authToken;
      var email = req.body.user.email;
      const doesUserExist = await UserService.getUserByEmail(email);

      const isValidDataValues = doesUserExist.dataValues;

      if (!isValidDataValues) {
        util.setError(STATUS.UNAUTHORIZED, EXPIREDTOKEN);
      }

      if (isValidDataValues && isValidDataValues.activated) {
        util.setError(STATUS.FORBIDDEN, TOKENISALREADYACTIVATED);
      }

      if (isValidDataValues && isValidDataValues.authToken === URLAuthToken) {
        isValidDataValues.activated = true;
        const userData = await UserService.updateUserActivated(
          isValidDataValues
        );
        const token = jwt.sign(
          {
            email: userData.email,
            authType: userData.authType,
            activated: userData.activated
          },
          config.production.JWT_SECRET,
          {
            expiresIn: tokenExpirationDate
          }
        );
        util.setSuccess(STATUS.SUCCESS, EMAILWASVERIFIED, {
          userData,
          token
        });
      } else {
        util.setError(STATUS.NO_CONTENT, USERWITHTOKENNOTFOUND);
      }

      return util.send(res);
    } catch (e) {
      console.error(e);
    }
  }

  static async signIn(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        util.setError(STATUS.INCORRECT, errors.mapped());
        return util.send(res);
      }
      const doesUserExist = await UserService.getUserByEmail(req.body.email);
      if (doesUserExist) {
        const userData = doesUserExist.dataValues;
        const token = jwt.sign(
          {
            email: userData.email,
            authType: userData.authType,
            activated: userData.activated
          },
          config.production.JWT_SECRET,
          {
            expiresIn: tokenExpirationDate
          }
        );
        util.setSuccess(STATUS.SUCCESS, USERLOGGEDIN, {
          token,
          userData
        });
      }
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.BAD_REQUEST, e);
      return util.send(res);
    }
  }

  static async signOut(res) {
    try {
      util.setSuccess(STATUS.SUCCESS, SIGNOUTMESS);
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.FORBIDDEN, USERSIGNEDOUT);
      return util.send(res);
    }
  }

  static async oauthGoogle(req, res) {
    try {
      const userData = await UserService.getUserByEmail(req.user.email);
      const token = jwt.sign(
        {
          email: userData.email,
          authType: userData.authType,
          activated: userData.activated
        },
        config.production.JWT_SECRET,
        {
          expiresIn: tokenExpirationDate
        }
      );
      util.setSuccess(STATUS.SUCCESS, SUCCESSGOOGLE, {
        token,
        userData
      });
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.FORBIDDEN, FAILUREGOOGLE);
      return util.send(res);
    }
  }

  static async oauthFacebook(req, res) {
    const userData = req.body;
    const token = jwt.sign(
      {
        email: userData.email,
        authType: userData.authType,
        activated: userData.activated
      },
      config.production.JWT_SECRET,
      {
        expiresIn: tokenExpirationDate
      }
    );
    res.status(STATUS.SUCCESS).json({ token });
  }

  static async editProfile(req, res) {
    const doesUserExist = await UserService.getUserByEmail(req.body.email);
    if (doesUserExist) {
      const userData = await UserService.updateUserFullname(req.body);
      const token = jwt.sign(
        {
          email: userData.email,
          authType: userData.authType,
          activated: userData.activated
        },
        config.production.JWT_SECRET,
        {
          expiresIn: tokenExpirationDate
        }
      );
      util.setSuccess(STATUS.SUCCESS, CHANGEDFULLNAME, {
        token,
        userData
      });
      return util.send(res);
    } else {
      validateResponseError(
        userData,
        UserModel,
        USERLISTMESS,
        USERNOTFOUNDMESS
      );
    }
  }

  static async changePassword(req, res) {
    const doesUserExist = await UserService.getUserByEmail(req.body.email);
    const oldPassword = req.body.payload.oldPassword;
    const newPassword = req.body.payload.newPassword;
    const checkIfPasswordsCompare = await UserService.checkPassword(
      doesUserExist.password,
      oldPassword
    );
    if (doesUserExist && checkIfPasswordsCompare) {
      const userData = await UserService.updateUserPassword(
        doesUserExist,
        newPassword
      );
      const token = jwt.sign(
        {
          email: userData.email,
          authType: userData.authType,
          activated: userData.activated
        },
        config.production.JWT_SECRET,
        {
          expiresIn: tokenExpirationDate
        }
      );
      util.setSuccess(STATUS.SUCCESS, CHANGEDPASSWORD, {
        token,
        userData
      });
    } else {
      util.setError(STATUS.FORBIDDEN, PASSWORDDIDNTCHANGE);
    }
    return util.send(res);
  }

  static async getUserData(req, res) {
    try {
      const doesUserExist = await UserService.getUserByEmail(req.body.email);
      if (doesUserExist.dataValues) {
        const userData = doesUserExist.dataValues;
        util.setSuccess(STATUS.SUCCESS, RECEIVEDUSER, {
          userData
        });
      } else {
        util.setError(STATUS.SUCCESS, USERNOTFOUNDMESS);
      }
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.NO_CONTENT, e);
      return util.send(res);
    }
  }

  static async sendVerificationEmail(req, res) {
    try {
      const email = req.body.email;
      const authToken = randomstring.generate();
      UserService.sendRegisterEmailViaEmailBuilder(authToken, email);
      const userData = await UserService.updateUserAuthToken(authToken, email);
      const token = jwt.sign(
        {
          email: userData.email,
          authType: userData.authType,
          activated: userData.activated
        },
        config.production.JWT_SECRET,
        {
          expiresIn: tokenExpirationDate
        }
      );
      util.setSuccess(STATUS.SUCCESS, EMAILSENT, {
        userData,
        token
      });
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.NO_CONTENT, e);
      return util.send(res);
    }
  }

  static async sendRecoverEmail(req, res) {
    try {
      const email = req.body.email;
      const doesUserExist = await UserService.getUserByEmail(email);
      if (doesUserExist) {
        UserService.sendRecoveryEmailViaEmailBuilder(email);
        util.setSuccess(STATUS.SUCCESS, EMAILSENT, email);
      }
      util.setError(STATUS.NO_CONTENT, EMAILISNOTFOUND);
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.NO_CONTENT, e);
      return util.send(res);
    }
  }

  static async recoverPassword(req, res) {
    try {
      const email = req.body.data.email;
      const password = req.body.data.password;
      const doesUserExist = await UserService.getUserByEmail(email);
      if (doesUserExist) {
        await UserService.updateUserPassword(doesUserExist, password);
        util.setSuccess(STATUS.SUCCESS, CHANGEDPASSWORD, email);
      } else {
        util.setError(STATUS.FORBIDDEN, USERNOTFOUNDMESS);
      }
      return util.send(res);
    } catch (e) {
      console.error(e);
    }
  }

  static async getUserCabinetOrders(req, res) {
    try {
      const URL = req.url.substr(req.url.lastIndexOf("/") + 1).toUpperCase();
      const email = req.body.data;
      const userData = await UserService.getUserByEmail(email);
      const userId = userData.id;
      let userOrders = [];
      switch (URL) {
        case CREATED:
          userOrders = await UserService.getUserOrdersByStatus(userId, CREATED);
          break;
        case PAID:
          userOrders = await UserService.getUserOrdersByStatus(userId, PAID);
          break;
        case COMPLETED:
          userOrders = await UserService.getUserOrdersByStatus(
            userId,
            COMPLETED
          );
          break;
          case OWNER:
          userOrders = await UserService.getOwnerOrders(
            userId
          );
          break;
      }

      util.setSuccess(STATUS.SUCCESS, GOTUSERORDERS, userOrders);
      return util.send(res);
    } catch (e) {
      console.error(e);
    }
  }
}
export default UserController;
