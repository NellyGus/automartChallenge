import express from 'express';
import userController from '../controllers/user_controller';
import validEmail from '../middlewares/valid_email';
import validPassword from '../middlewares/valid_password';
import validAccount from '../middlewares/valid_account';

const user_route= express.Router();

user_route.post('/api/v1/auth/signup', validEmail, validPassword, validAccount, userController.createAccount)
user_route.post('/api/v1/auth/signin', validEmail, validPassword, userController.login)

export default user_route;