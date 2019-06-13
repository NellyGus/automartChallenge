'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _car_controller = require('../controllers/car_controller');

var _car_controller2 = _interopRequireDefault(_car_controller);

var _valid_car = require('../middlewares/valid_car');

var _valid_car2 = _interopRequireDefault(_valid_car);

var _valid_price = require('../middlewares/valid_price');

var _valid_price2 = _interopRequireDefault(_valid_price);

var _valid_status = require('../middlewares/valid_status');

var _valid_status2 = _interopRequireDefault(_valid_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var car_router = _express2.default.Router();

car_router.post('/api/v1/car', _auth2.default, _valid_car2.default, _valid_price2.default, _valid_status2.default, _car_controller2.default.postCar), car_router.get('/api/v1/cars', _auth2.default, _car_controller2.default.getAllCars), car_router.get('/api/v1/car/:car_id', _auth2.default, _car_controller2.default.getCarById), car_router.delete('/api/v1/car/:car_id', _auth2.default, _car_controller2.default.deleteCar), car_router.get('/api/v1/car', _auth2.default, _car_controller2.default.searchCars), car_router.patch('/api/v1/car/:car_id/status', _auth2.default, _valid_status2.default, _car_controller2.default.updateStatus), car_router.patch('/api/v1/car/:car_id/price', _auth2.default, _valid_price2.default, _car_controller2.default.updatePrice);

exports.default = car_router;
//# sourceMappingURL=car_route.js.map