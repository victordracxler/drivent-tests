import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

const hotelsRouter = Router();

hotelsRouter.get('/hotels');
hotelsRouter.get('/hotels/:hotelId');

export { hotelsRouter };
