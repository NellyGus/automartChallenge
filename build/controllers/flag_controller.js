'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flag_model = require('../model/flag_model');

var _flag_model2 = _interopRequireDefault(_flag_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlagController = function () {
    function FlagController() {
        _classCallCheck(this, FlagController);
    }

    _createClass(FlagController, [{
        key: 'postFlag',
        value: function postFlag(request, response) {
            if (!request.body.created_on || !request.body.reason || !request.body.description) {
                response.status(400).send({
                    status: 400,
                    message: 'Each field is required, retry please'
                });
            }
            var flag = {
                id: _flag_model2.default.length,
                car_id: 2,
                created_on: request.body.created_on,
                reason: request.body.reason,
                description: request.body.description

            };
            _flag_model2.default.push(flag);

            return response.status(201).send({
                status: 201,
                message: 'Flag added successfully',
                car: car
            });
        }
    }]);

    return FlagController;
}();

var flagController = new FlagController();
exports.default = flagController;
//# sourceMappingURL=flag_controller.js.map