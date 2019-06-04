import express from 'express';
import userController from '../controllers/user_controller';

const user_route= express.Router();

user_route.post('/api/v1/auth/signup', userController.createAccount)
user_route.post('/api/v1/auth/signin', userController.login)

export default user_route;