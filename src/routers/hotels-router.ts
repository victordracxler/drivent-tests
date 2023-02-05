import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getHotelRooms } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken);
hotelsRouter.get('/', getAllHotels);
hotelsRouter.get('/:hotelId', getHotelRooms);

export { hotelsRouter };
