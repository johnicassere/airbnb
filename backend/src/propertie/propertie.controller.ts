import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PropertieService } from './propertie.service';
import { CreatePropertieDto } from './dto/create-propertie.dto';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Propertie, User } from '@prisma/client';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('propertie')
@Controller('propertie')
export class PropertieController {
  constructor(private readonly propertieService: PropertieService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Criar uma propriedade',
  })
  @ApiBearerAuth()
  create(
    @Body() createPropertieDto: CreatePropertieDto,
    @LoggedUser() user: User,
  ): Promise<Propertie> {
    return this.propertieService.create(createPropertieDto, user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as propriedades disponiveis',
  })
  findMany(): Promise<Propertie[]> {
    return this.propertieService.findMany();
  }
}
