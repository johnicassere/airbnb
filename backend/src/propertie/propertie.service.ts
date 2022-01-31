import { Injectable } from '@nestjs/common';
import { Propertie } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePropertieDto } from './dto/create-propertie.dto';

@Injectable()
export class PropertieService {
  constructor(private prismaService: PrismaService) {}

  async create(createPropertieDto: CreatePropertieDto, userId: string) {
    const createdPropertie = await this.prismaService.propertie.create({
      data: {
        title: createPropertieDto.title,
        price: createPropertieDto.price,
        description: createPropertieDto.description,
        imageUrl: createPropertieDto.imageUrl,
        User: {
          connect: {
            id: userId,
          },
        },
        options: {
          connect: createPropertieDto.options.map((item) => ({ id: item })),
        },
      },
      include: {
        User: true,
        options: true,
      },
    });

    return createdPropertie;
  }

  async findMany(): Promise<Propertie[]> {
    const properties = await this.prismaService.propertie.findMany();
    return properties;
  }
}
