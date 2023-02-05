import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotelList = await hotelService.getAllHotels(userId);
    return res.status(httpStatus.OK).send(hotelList);
  } catch (error) {
    if (error.name === 'PaymentRequiredError') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);

  try {
    const hotelWithRooms = hotelService.getHotelWithRooms(userId, hotelId);
    return res.status(httpStatus.OK).send(hotelWithRooms);
  } catch (error) {
    if (error.name === 'PaymentRequiredError') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
