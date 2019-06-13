'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user_controller = require('../controllers/user_controller');

var _user_controller2 = _interopRequireDefault(_user_controller);

var _valid_email = require('../middlewares/valid_email');

var _valid_email2 = _interopRequireDefault(_valid_email);

var _valid_password = require('../middlewares/valid_password');

var _valid_password2 = _interopRequireDefault(_valid_password);

var _valid_account = require('../middlewares/valid_account');

var _valid_account2 = _interopRequireDefault(_valid_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user_route = _express2.default.Router();

user_route.post('/api/v1/auth/signup', _valid_account2.default, _valid_email2.default, _valid_password2.default, _user_controller2.default.createAccount);
user_route.post('/api/v1/auth/signin', _valid_email2.default, _valid_password2.default, _user_controller2.default.login);

exports.default = user_route;
//# sourceMappingURL=user_route.js.map