import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '@prisma/client';
import { ResponseCreateReservationDto } from './dto/response-create-reservation.dto';
import console from 'console';

@Injectable()
export class ReservationService {
  constructor(private prismaService: PrismaService) {}

  async create(user: User, createReservationDto: CreateReservationDto) {
    const propertieInfo = await this.prismaService.propertie.findUnique({
      where: {
        id: createReservationDto.propertie,
      },
    });

    if (!propertieInfo) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    // TODO Validar se a propriedade está vaga nos dias selecionados
    // TODO verificar quantas diárias o usuário selecionou
    // TODO calcular quanto vai ficar no valor total o preço do aluguel

    const createdReservation = await this.prismaService.reservation.create({
      data: {
        start: createReservationDto.start,
        end: createReservationDto.end,
        User: {
          connect: {
            id: user.id,
          },
        },
        Propertie: {
          connect: {
            id: createReservationDto.propertie,
          },
        },
      },
    });

    const responseCreateReservationDto: ResponseCreateReservationDto = {
      reservationId: createdReservation.id,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      reservationStart: createdReservation.start,
      reservationEnd: createdReservation.end,
      propertieTitle: propertieInfo.title,
      propertiePrice: propertieInfo.price,
      propertieDescription: propertieInfo.description,
      propertieImage: propertieInfo.imageUrl,
    };

    return { responseCreateReservationDto };
  }
}
