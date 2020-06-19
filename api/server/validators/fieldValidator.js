const { check, param } = require("express-validator");
import UserService from "../services/UserService";
import AddressService from "../services/AddressService";

export const checkString = (fieldName, options = {}) => {
  return [
    check(fieldName).exists(),
    check(fieldName).isString(),
    check(fieldName).isLength(options)
  ];
};

export const checkInt = (fieldName, options = {}) => {
  return [check(fieldName).exists(), check(fieldName).isInt(options)];
};


export const checkIntInParams = (paramName, options = {}) => {
  return [param(paramName).exists(), param(paramName).isInt(options)];
};

export const checkOwnerId = (id) => {
  return UserService.getUserById(id).then(user => {
    if (!user) {
      return Promise.reject("Unknown user");
    }
  });
};

export const checkIfUserWithEmailExists = (email) => {
  return UserService.getUserByEmail(email).then(user => {
    if (!user) {
      return Promise.reject("Unknown user");
    }
  });
};

export const checkDate = (fieldName, options = {} ) => { 
    if (!fieldName.match(/^\d{4}-\d{2}-\d{2}$/)) return Promise.reject('Invalid data');

    const date = new Date(fieldName);
    if (!date.getTime()) return Promise.reject('Invalid data');
    return date.toISOString().slice(0, 10) === fieldName;
}

export const checkAddressId = (id) => {
  return AddressService.getAddressById(id).then(address => {
    if (!address) {
      return Promise.reject("Unknown address");
    }
  });
};

export const checkLatLong = (latLong) => {
  return [check(latLong).exists, check(latLong).isLatLong];
}