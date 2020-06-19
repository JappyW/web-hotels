import Router from 'express';
import AddressController from '../controllers/AddressController';

const router = Router();

router.get('/', AddressController.getAllAddresses);
router.post('/', AddressController.validate('addAddress'), AddressController.addAddress);

export default router;
