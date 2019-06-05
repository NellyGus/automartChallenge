import express from 'express';
import flagController from '../controllers/flag_controller';
import auth from '../middlewares/auth';

const flag_router= express.Router();

flag_router.post('/api/v1/flag', auth, flagController.postFlag)

export default flag_router;