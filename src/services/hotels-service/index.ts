import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Hotel, Room, TicketStatus } from '@prisma/client';

async function getAllHotels(userId: number): Promise<Hotel[]> {
  const enrollmentId = await enrollmentIdExistsOrFail(userId);
  await ticketExistsOrFail(enrollmentId);
  return await hotelRepository.findAllHotels();
}

async function getHotelWithRooms(userId: number, hotelId: number): Promise<Hotel & { Rooms: Room[] }> {
  const enrollmentId = await enrollmentIdExistsOrFail(userId);
  await ticketExistsOrFail(enrollmentId);

  const hotel = await hotelRepository.findHotelRooms(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

async function enrollmentIdExistsOrFail(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }
  return enrollment.id;
}

async function ticketExistsOrFail(enrollmentId: number) {
  const userTicket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);

  if (!userTicket) {
    throw notFoundError();
  }
  if (!userTicket.TicketType.includesHotel) {
    throw paymentRequiredError();
  }
  if (userTicket.TicketType.isRemote) {
    throw paymentRequiredError();
  }
  if (userTicket.status === TicketStatus.RESERVED) {
    throw paymentRequiredError();
  }
}

const hotelService = {
  getAllHotels,
  getHotelWithRooms,
};

export default hotelService;
