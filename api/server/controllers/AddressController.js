import AddressService from '../services/AddressService';
import { validationResult } from 'express-validator';
import * as fieldValidator from '../validators/fieldValidator';
import { validateResponse, util } from "./ResponseWrapper";
const STATUS = require('../constants/status.code.env');
const VALIDATION = require('../constants/controller.env');
import { ADDRESS_FIELDS } from '../constants/modelsFields';
const ADDRESSES_LIST = 'Addresses List';
const ADDRESS_ADDED = 'Address Added!';
import {STUDIO_STATUS} from '../constants/EnumForStudioStatus';

class AddressController {
    static async getAllAddresses(req, res) {
        try {
            const addresses = await AddressService.getAllAddresses();
            validateResponse(addresses.length, addresses, ADDRESSES_LIST);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

    static checkAddressFields() {
        return [
            ...fieldValidator.checkString(ADDRESS_FIELDS.country, { min: 2, max: 50 }),
            ...fieldValidator.checkString(ADDRESS_FIELDS.city, { min: 1, max: 50 }),
            ...fieldValidator.checkString(ADDRESS_FIELDS.street, { min: 1, max: 50 }),
            ...fieldValidator.checkString(ADDRESS_FIELDS.latLong)
        ];
    }

    static validate(method) {
        switch (method) {
            case VALIDATION.ADD_ADDRESS: return this.checkAddressFields();
        }
    }

    static async addAddress(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            let newAddress = req.body;
            newAddress.status = STUDIO_STATUS.INACTIVE;
            const createdAddress = await AddressService.addAddress(newAddress);
            util.setSuccess(STATUS.CREATED, ADDRESS_ADDED, createdAddress);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }
}

export default AddressController;
