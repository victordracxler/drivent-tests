import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Hotel, Room } from '@prisma/client';

export async function createHotel(params: Partial<Hotel> = {}): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoom(params: Partial<Room> = {}): Promise<Room> {
  return prisma.room.create({
    data: {
      hotelId: params.hotelId,
      name: faker.name.findName(),
      capacity: faker.datatype.number({ min: 1, max: 4 }),
    },
  });
}
