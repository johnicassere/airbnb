import { IsString, IsNotEmpty, IsEmail, IsUrl, IsDate } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
