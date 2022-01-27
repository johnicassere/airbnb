import {
  IsString,
  IsEmail,
  IsUrl,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  @ApiProperty()
  imageUrl: string;
}
