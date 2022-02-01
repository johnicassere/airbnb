import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '@prisma/client';
import { getWeakDay } from 'src/utils/functions';

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

    const reservations = await this.prismaService.reservation.findMany({
      where: {
        propertieId: propertieInfo.id,
      },
    });

    const dtoStartDate = {
      day: new Date(createReservationDto.start).getDate(),
      month: new Date(createReservationDto.start).getMonth(),
      year: new Date(createReservationDto.start).getFullYear(),
    };

    const dtoEndDate = {
      day: new Date(createReservationDto.end).getDate(),
      month: new Date(createReservationDto.end).getMonth(),
      year: new Date(createReservationDto.end).getFullYear(),
    };

    const foundedReservations = reservations.map((item) => {
      // getDay() vai pegar o dia da semana (segunda, terça) começando por 0 e a partir da segunda-feira
      // getDate() vai pegar o dia da semana númerico, começando de 0 até 30
      // getMonth() vai pegar o mês começando de 0
      // getFullYear vai pegar o ano completo

      // Data inicial quebrada
      const startDay = item.start.getDate();
      const startMes = item.start.getMonth();
      const startAno = item.start.getFullYear();

      // Data final quebrada
      const endDay = item.end.getDate();
      const endMes = item.end.getMonth();
      const endAno = item.end.getFullYear();

      // Quando data de início e fim são iguais, ou quando início é igual ou fim é igual
      if (
        (startDay === dtoStartDate.day &&
          startMes === dtoStartDate.month &&
          startAno === dtoStartDate.year) ||
        (endDay === dtoEndDate.day &&
          endMes === dtoEndDate.month &&
          endAno === dtoEndDate.year)
      ) {
        throw new ConflictException('Periodo já reservado');
      }

      // Verificar se o mês é igual
      if (startMes === dtoStartDate.month && endMes === dtoEndDate.month) {
        //cenário feliz
        if (dtoStartDate.day > startDay || dtoStartDate.day < endDay) {
          throw new ConflictException('Periodo já reservado');
        }
      }
    });

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

    const weakStartDay = createdReservation.start.getDay();
    const weakEndDay = createdReservation.end.getDay();

    return {
      createdReservation,
      mesage: `Reserva com início no dia ${
        createdReservation.start
      } ${getWeakDay(weakStartDay)} e terminando em ${
        createdReservation.end
      } ${getWeakDay(weakEndDay)}`,
    };
  }
}
