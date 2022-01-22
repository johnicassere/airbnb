import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userEmailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userEmailExists) {
      throw new ConflictException('Email já cadastrado');
    }

    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new ConflictException('Senhas digitadas não conferem');
    }

    delete createUserDto.passwordConfirmation;

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    delete createdUser.password;

    return createdUser;
  }
}
