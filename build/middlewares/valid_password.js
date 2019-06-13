'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var valid_password = function valid_password(request, response, next) {
    var password = request.body.password;


    if (!password) {
        return response.status(400).send({
            status: 400,
            error: 'password is required'
        });
    }
    if (password.trim().length < 6) {
        return response.status(400).send({
            status: 400,
            error: 'password cannot be less than 6 characters'
        });
    }
    return next();
};

exports.default = valid_password;
//# sourceMappingURL=valid_password.js.map