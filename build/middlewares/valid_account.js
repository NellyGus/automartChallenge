'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var valid_account = function valid_account(request, response, next) {
    var _request$body = request.body,
        first_name = _request$body.first_name,
        last_name = _request$body.last_name,
        address = _request$body.address;


    first_name = first_name.trim().replace(/\s+/g, '');
    last_name = last_name.trim().replace(/\s+/g, '');

    if (!first_name || !last_name) {
        return response.status(400).send({
            status: 400,
            error: 'firstname or lastname is required'
        });
    }
    if ((first_name + last_name).split('').some(function (str) {
        return Number.isInteger(parseInt(str, 10));
    })) {
        return response.status(400).send({
            status: 400,
            error: 'firstname or lastname cannot contain number'
        });
    }
    if (!address) {
        return response.status(400).send({
            status: 400,
            error: 'address is required'
        });
    }
    if (first_name.length < 3 || last_name.length < 3) {
        return response.status(400).send({
            status: 400,
            error: 'firstname or lastname cannot be less than 3 characters'
        });
    }
    return next();
};
exports.default = valid_account;
//# sourceMappingURL=valid_account.js.map