'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _car_model = require('../model/car_model');

var _car_model2 = _interopRequireDefault(_car_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarController = function () {
    function CarController() {
        _classCallCheck(this, CarController);
    }

    _createClass(CarController, [{
        key: 'postCar',
        value: function postCar(request, response) {
            var car = {
                id: _car_model2.default.length + 1,
                owner: 2,
                created_on: new Date(),
                state: request.body.state.trim().replace(/\s+/g, ''),
                status: request.body.status.trim().replace(/\s+/g, ''),
                price: request.body.price,
                manufacturer: request.body.manufacturer,
                model: request.body.model,
                year: request.body.year,
                more_description: request.body.more_description
            };
            _car_model2.default.push(car);

            return response.status(201).send({
                status: 201,
                message: 'car added successfully',
                car: car
            });
        }
    }, {
        key: 'getAllCars',
        value: function getAllCars(request, response) {
            return response.status(200).send({
                status: 200,
                cars: _car_model2.default
            });
        }
    }, {
        key: 'getCarById',
        value: function getCarById(request, response) {
            var found = _car_model2.default.find(function (car) {
                return car.id === parseInt(request.params.car_id);
            });
            if (found) {
                response.status(200).send({
                    status: 200,
                    car: found
                });
            } else {
                response.status(404).send({
                    status: 404,
                    message: 'Car not found'
                });
            }
        }
    }, {
        key: 'searchCars',
        value: function searchCars(request, response) {
            var query = request.query;


            if (query.status) {
                var filtered = _car_model2.default.filter(function (car) {
                    return car.status === request.query.status;
                });
                if (filtered.length === 0) {
                    return res.status(200).send({
                        status: 200,
                        data: 'Not found'
                    });
                }

                return response.status(200).send({
                    status: 200,
                    data: filtered
                });
            }
            if (query.status && query.manufacturer) {
                var _filtered = _car_model2.default.filter(function (car) {
                    return car.status === query.status && car.manufacturer === query.manufacturer;
                });
                if (_filtered.length === 0) {
                    return res.status(200).send({
                        status: 200,
                        data: 'Not found'
                    });
                }

                return response.status(200).send({
                    status: 200,
                    data: _filtered
                });
            }
            if (query.status && query.state) {
                var _filtered2 = _car_model2.default.filter(function (car) {
                    return car.status === query.status && car.state === query.state;
                });
                if (_filtered2.length === 0) {
                    return res.status(200).send({
                        status: 200,
                        data: 'Not found'
                    });
                }

                return response.status(200).send({
                    status: 200,
                    data: _filtered2
                });
            }
            if (query.status && query.min_price && query.max_price) {
                var _filtered3 = _car_model2.default.filter(function (car) {
                    return car.status === query.status && car.price >= query.min_price && car.price <= query.max_price;
                });
                if (_filtered3.length === 0) {
                    return res.status(200).send({
                        status: 200,
                        data: 'Not found'
                    });
                }

                return response.status(200).send({
                    status: 200,
                    data: _filtered3
                });
            }
        }
    }, {
        key: 'updatePrice',
        value: function updatePrice(request, response) {
            var found = _car_model2.default.find(function (car) {
                return car.id === parseInt(request.params.car_id);
            });
            if (found) {
                var car = found;
                car.price = request.body.price;
                return response.status(200).send({
                    status: 200,
                    car: car
                });
            } else {
                return response.status(404).send({
                    status: 404,
                    message: 'Car not found'
                });
            }
        }
    }, {
        key: 'updateStatus',
        value: function updateStatus(request, response) {
            var found = _car_model2.default.find(function (car) {
                return car.id === parseInt(request.params.car_id);
            });
            if (found) {
                var car = found;
                car.status = request.body.status;
                return response.status(200).send({
                    status: 200,
                    data: car
                });
            } else {
                return response.status(404).send({
                    status: 404,
                    message: 'Car not found'
                });
            }
        }
    }, {
        key: 'deleteCar',
        value: function deleteCar(request, response) {
            var found = _car_model2.default.find(function (car) {
                return car.id === parseInt(request.params.car_id);
            });
            if (found) {
                var targetIndex = _car_model2.default.indexOf(found);
                _car_model2.default.splice(targetIndex, 1);
                return response.status(200).send({
                    status: 200,
                    message: 'Car deleted successfully'
                });
            } else {
                return response.status(404).send({
                    status: 404,
                    message: 'Car not found'
                });
            }
        }
    }]);

    return CarController;
}();

var carController = new CarController();
exports.default = carController;
//# sourceMappingURL=car_controller.js.map