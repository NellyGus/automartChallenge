'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var valid_status = function valid_status(request, response, next) {
  var status = request.body.status;


  status = status.trim().replace(/\s+/g, '');

  if (!status) {
    return response.status(400).json({
      status: 400,
      error: 'Status is required'
    });
  }

  if (status.split('').some(function (x) {
    return Number.isInteger(parseInt(x, 10));
  })) {
    return response.status(400).json({
      status: 400,
      error: 'Status cannot contain number'
    });
  }

  return next();
};

exports.default = valid_status;
//# sourceMappingURL=valid_status.js.map