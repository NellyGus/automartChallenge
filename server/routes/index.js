import express from 'express';

const index_route = express.Router();

index_route.get('/', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to Automart API',
}));

export default index_route;