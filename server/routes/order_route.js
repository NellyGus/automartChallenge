import express from 'express';
import order_controller from '../controllers/order_controller';
import auth from '../middlewares/auth';
import validPrice from '../middlewares/valid_price';
import validPriceOffered from '../middlewares/valid_price_offered';
import validNewPriceOffered from '../middlewares/valid_new_price'; 


const order_route = express.Router();

order_route.post('/api/v1/order', auth, validPrice, validPriceOffered, order_controller.makeOrder),
order_route.patch('/api/v1/:order_id/price', auth, validNewPriceOffered, order_controller.updatePrice)

export default order_route;