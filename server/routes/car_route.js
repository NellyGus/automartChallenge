import express from 'express';
import auth from '../middlewares/auth';
import carController from '../controllers/car_controller';

const car_router = express.Router();

car_router.post('/api/v1/car', auth, carController.postCar ),
car_router.get('/api/v1/cars', auth, carController.getAllCars),
car_router.get('/api/v1/car/:car_id', auth, carController.getCarById),
car_router.delete('/api/v1/car/:car_id', auth, carController.deleteCar),
car_router.get('/api/v1/car',auth, carController.searchCars),
car_router.patch('/api/v1/car/:car_id/status', auth, carController.updateStatus),
car_router.patch('/api/v1/car/:car_id/price', auth, carController.updatePrice)

export default car_router;