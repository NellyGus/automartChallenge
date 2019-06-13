'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var valid_email = function valid_email(request, response, next) {
    var email = request.body.email;


    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
        return response.status(400).send({
            status: 400,
            error: 'Email address is required'
        });
    }
    if (!re.test(String(email).toLowerCase())) {
        return response.status(400).send({
            status: 400,
            error: 'provide a valid email address, please'
        });
    }

    return next();
};

exports.default = valid_email;
//# sourceMappingURL=valid_email.js.map