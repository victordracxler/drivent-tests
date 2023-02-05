import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken);
hotelsRouter.get('/', getAllHotels);
hotelsRouter.get('/:hotelId');

export { hotelsRouter };
