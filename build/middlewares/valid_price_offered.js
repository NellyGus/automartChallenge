'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var valid_price_offered = function valid_price_offered(request, response, next) {
  var price_offered = request.body.price_offered;


  if (Number.isNaN(price_offered)) {
    return response.status(400).send({
      status: 400,
      error: 'price is not valid'
    });
  }

  return next();
};

exports.default = valid_price_offered;
//# sourceMappingURL=valid_price_offered.js.map