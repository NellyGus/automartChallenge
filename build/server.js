'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _car_route = require('./routes/car_route');

var _car_route2 = _interopRequireDefault(_car_route);

var _flag_route = require('./routes/flag_route');

var _flag_route2 = _interopRequireDefault(_flag_route);

var _order_route = require('./routes/order_route');

var _order_route2 = _interopRequireDefault(_order_route);

var _user_route = require('./routes/user_route');

var _user_route2 = _interopRequireDefault(_user_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {PORT} from './config';


var app = (0, _express2.default)();

_dotenv2.default.config();

app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_car_route2.default);
app.use(_user_route2.default);
app.use(_flag_route2.default);
app.use(_order_route2.default);

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  return _fancyLog2.default.info('Listening at ' + PORT);
});

exports.default = app;
//# sourceMappingURL=server.js.map