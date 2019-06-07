import express from 'express';
import bodyParser from 'body-parser';
import car_router from './routes/car_route';
import flag_router from './routes/flag_route';
import order_router from './routes/order_route';
import user_route from './routes/user_route';
import {PORT} from './config';


const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(car_router);
server.use(user_route);
server.use(flag_router);
server.use(order_router);

server.listen(PORT, ()=>{
    console.debug('server running on port '+PORT);
});

export default server;
