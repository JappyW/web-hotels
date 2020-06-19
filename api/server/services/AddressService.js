import database from '../src/models'

class AddressService {
    static async getAllAddresses() {
        try {
            return await database.addresses.findAll();
        } catch (e) {
            throw e;
        }
    }
    
    static async getAddressById(id) {
        try {
            return await database.addresses.findByPk(id);
        } catch (e) {
            throw e;
        }
    }

    static async addAddress(newAddress) {
        try {
            const addressExists = await database.addresses.findOne({
                where: { 
                    city: newAddress.city, 
                    country: newAddress.country, 
                    street: newAddress.street, 
                    latLong: newAddress.latLong
                }
            });
            if (addressExists) {
                throw (ADDRESS_EXISTS);
            }
            return await database.addresses.create(newAddress);
        } catch (e) {
            throw e;
        }
    }
}

export default AddressService;
