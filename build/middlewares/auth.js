'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res, next) {
  var authorization = req.headers.authorization;


  if (!authorization) {
    res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again'
    });
  } else {
    var token = authorization.split(' ')[1].trim();

    _jsonwebtoken2.default.verify(token, _config.JWT_SECRET, function (err, decodedData) {
      if (err) {
        res.status(401).json({
          status: 401,
          error: 'Authentication failed! Please Login again'
        });
      }

      req.authData = decodedData;
      next();
    });
  }
};
//# sourceMappingURL=auth.js.map