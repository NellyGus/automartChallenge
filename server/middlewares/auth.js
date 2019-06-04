import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config'

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      status: 401,
      error: 'Authentication failed! Please Login again',
    });
  } else {
    const token = authorization.split(' ')[1].trim();

    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
      if (err) {
        res.status(401).json({
          status: 401,
          error: 'Authentication failed! Please Login again',
        });
      }

      req.authData = decodedData;
      next();
    });
  }
};