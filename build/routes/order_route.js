'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _order_controller = require('../controllers/order_controller');

var _order_controller2 = _interopRequireDefault(_order_controller);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _valid_price = require('../middlewares/valid_price');

var _valid_price2 = _interopRequireDefault(_valid_price);

var _valid_price_offered = require('../middlewares/valid_price_offered');

var _valid_price_offered2 = _interopRequireDefault(_valid_price_offered);

var _valid_new_price = require('../middlewares/valid_new_price');

var _valid_new_price2 = _interopRequireDefault(_valid_new_price);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var order_route = _express2.default.Router();

order_route.post('/api/v1/order', _auth2.default, _valid_price2.default, _valid_price_offered2.default, _order_controller2.default.makeOrder), order_route.patch('/api/v1/:order_id/price', _auth2.default, _valid_new_price2.default, _order_controller2.default.updatePrice);

exports.default = order_route;
//# sourceMappingURL=order_route.js.map