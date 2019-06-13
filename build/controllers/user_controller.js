'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user_model = require('../model/user_model');

var _user_model2 = _interopRequireDefault(_user_model);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var saltRounds = 3;

var UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);
    }

    _createClass(UserController, [{
        key: 'createAccount',
        value: function createAccount(request, response) {
            _bcrypt2.default.hash(request.body.password, saltRounds, function (err, hash) {
                var newUser = {
                    id: _user_model2.default.length + 1,
                    email: request.body.email,
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    password: hash,
                    address: request.body.address,
                    is_admin: false
                };
                _user_model2.default.push(newUser);

                var token = _jsonwebtoken2.default.sign({ newUser: newUser }, _config.JWT_SECRET, { expiresIn: 60 * 1440 });

                return response.status(201).send({
                    status: 201,
                    message: 'Account created successfully',
                    token: token,
                    newUser: newUser
                });
            });
        }
    }, {
        key: 'login',
        value: function login(request, response) {
            var _request$body = request.body,
                email = _request$body.email,
                password = _request$body.password;

            // Check if email is present in Users array

            var found = _user_model2.default.some(function (user) {
                return user.email === email;
            });

            if (!found) {
                return response.status(400).send({
                    status: 400,
                    error: 'Email not found'
                });
            }

            // Get User using the email
            var findEmail = function findEmail(email) {
                return _user_model2.default.find(function (user) {
                    return user.email === email;
                });
            };

            var user = findEmail(email);

            var token = _jsonwebtoken2.default.sign({ user: user }, _config.JWT_SECRET, { expiresIn: 60 * 60 });

            // Compare password
            _bcrypt2.default.compare(password, user.password, function (err, result) {
                if (!result) {
                    response.status(400).send({
                        status: 400,
                        error: 'Password is incorrect'
                    });
                } else {
                    return response.status(200).json({
                        status: 200,
                        data: {
                            token: token,
                            id: user.id,
                            firstname: user.first_name,
                            lastname: user.last_name,
                            email: user.email
                        }
                    });
                }
            });
        }
    }]);

    return UserController;
}();

var userController = new UserController();
exports.default = userController;
//# sourceMappingURL=user_controller.js.map