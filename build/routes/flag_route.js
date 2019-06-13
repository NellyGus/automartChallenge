'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _flag_controller = require('../controllers/flag_controller');

var _flag_controller2 = _interopRequireDefault(_flag_controller);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flag_router = _express2.default.Router();

flag_router.post('/api/v1/flag', _auth2.default, _flag_controller2.default.postFlag);

exports.default = flag_router;
//# sourceMappingURL=flag_route.js.map