import express from 'express';
import bodyParser from 'body-parser';
import car_router from './server/routes/car_route';
import flag_router from './server/routes/flag_route';
import order_router from './server/routes/order_route';
import user_route from './server/routes/user_route';
import {PORT} from './server/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(car_router);
app.use(user_route);
app.use(flag_router);
app.use(order_router);

app.listen(PORT, ()=>{
    console.debug('server running on port '+PORT);
})
