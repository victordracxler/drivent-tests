import { prisma } from '@/config';

async function findAllHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRooms(hotelId: number) {
  return prisma.hotel.findFirst({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}
const hotelRepository = {
  findAllHotels,
  findHotelRooms,
};

export default hotelRepository;
