import {
  IsString,
  IsEmail,
  IsUrl,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  imageUrl: string;
}
