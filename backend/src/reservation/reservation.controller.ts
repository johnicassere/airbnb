import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma reserva',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(
    @LoggedUser() user: User,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationService.create(user, createReservationDto);
  }
}
