'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var valid_price = function valid_price(request, response, next) {
    var price = request.body.price;

    price = parseFloat(price);

    if (Number.isNaN(price)) {
        return response.status(400).send({
            status: 400,
            error: 'price is invalid'
        });
    }
    return next();
};
exports.default = valid_price;
//# sourceMappingURL=valid_price.js.map