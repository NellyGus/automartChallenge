'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _car_route = require('./routes/car_route');

var _car_route2 = _interopRequireDefault(_car_route);

var _flag_route = require('./routes/flag_route');

var _flag_route2 = _interopRequireDefault(_flag_route);

var _order_route = require('./routes/order_route');

var _order_route2 = _interopRequireDefault(_order_route);

var _user_route = require('./routes/user_route');

var _user_route2 = _interopRequireDefault(_user_route);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_car_route2.default);
app.use(_user_route2.default);
app.use(_flag_route2.default);
app.use(_order_route2.default);

app.listen(_config.PORT, function () {
    console.debug('server running on port ' + _config.PORT);
});

exports.default = app;
//# sourceMappingURL=server.js.map