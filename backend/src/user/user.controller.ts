import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findMany(): Promise<UserDto[]> {
    return this.userService.findMany();
  }

  @Get(':id')
  findUnique(@Param('id') userId: string): Promise<User> {
    return this.userService.findUnique(userId);
  }

  @Patch(':id')
  update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    return this.userService.delete(userId);
  }
}
