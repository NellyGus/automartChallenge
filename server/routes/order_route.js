import express from 'express';
import order_controller from '../controllers/order_controller';
import auth from '../middlewares/auth';

const order_route = express.Router();

order_route.post('/api/v1/order', auth, order_controller.makeOrder),
order_route.patch('/api/v1/:order_id/price', auth, order_controller.updatePrice)

export default order_route;