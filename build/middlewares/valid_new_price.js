'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var new_price_offered = function new_price_offered(request, response, next) {
  var new_price_offered = request.body.new_price_offered;


  if (Number.isNaN(new_price_offered)) {
    return response.status(400).send({
      status: 400,
      error: 'price is not valid'
    });
  }

  return next();
};

exports.default = new_price_offered;
//# sourceMappingURL=valid_new_price.js.map