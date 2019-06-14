import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import log from 'fancy-log';
import cors from 'cors';
import morgan from 'morgan';
import car_router from './routes/car_route';
import flag_router from './routes/flag_route';
import order_router from './routes/order_route';
import user_route from './routes/user_route';
// import {PORT} from './config';


const app = express();

dotenv.config();

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(car_router);
app.use(user_route);
app.use(flag_router);
app.use(order_router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => log.info(`Listening at ${PORT}`));

export default app;
