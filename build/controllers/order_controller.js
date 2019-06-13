'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _order_model = require('../model/order_model');

var _order_model2 = _interopRequireDefault(_order_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderController = function () {
    function OrderController() {
        _classCallCheck(this, OrderController);
    }

    _createClass(OrderController, [{
        key: 'makeOrder',
        value: function makeOrder(request, response) {
            if (!request.car_id || !request.created_on || !request.status || !request.price || !request.price_offered) {
                response.status(400).send({
                    status: 400,
                    message: 'Each field is required, retry please'
                });
            } else {
                var order = {
                    id: _order_model2.default.length + 1,
                    car_id: request.body.car_id,
                    created_on: request.body.created_on,
                    status: request.body.status.toLowerCase(),
                    price: request.body.price,
                    price_offered: request.body.price_offered
                };
                _order_model2.default.push(order);

                return response.status(201).send({
                    status: 201,
                    message: 'car added successfully',
                    order: order
                });
            }
        }
    }, {
        key: 'updatePrice',
        value: function updatePrice(request, response) {
            var found = _order_model2.default.find(function (order) {
                return order.id === parseInt(request.params.order_id);
            });
            if (found) {
                var _response$status$send;

                var order = found;
                if (order.status === 'accepted' || order.status === 'rejected') {
                    return res.status(400).json({
                        status: 400,
                        error: 'Cannot update price. Order status is either accepted or rejected'
                    });
                }
                order.price = request.body.new_price_offered;
                return response.status(200).send((_response$status$send = {
                    status: 200,
                    id: order.id,
                    car_id: order.car_id
                }, _defineProperty(_response$status$send, 'status', order.status), _defineProperty(_response$status$send, 'old_price_offered', order.price_offered), _defineProperty(_response$status$send, 'new_price_offered', order.new_price_offered), _response$status$send));
            } else {
                return response.status(404).send({
                    status: 404,
                    message: 'Order not found'
                });
            }
        }
    }]);

    return OrderController;
}();

var orderController = new OrderController();
exports.default = orderController;
//# sourceMappingURL=order_controller.js.map