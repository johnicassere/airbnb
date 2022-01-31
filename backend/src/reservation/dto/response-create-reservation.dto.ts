import {
  IsString,
  IsEmail,
  IsDateString,
  IsUrl,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class ResponseCreateReservationDto {
  @IsString()
  @IsNotEmpty()
  reservationId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsDateString()
  @IsNotEmpty()
  reservationStart: Date;

  @IsDateString()
  @IsNotEmpty()
  reservationEnd: Date;

  @IsString()
  @IsNotEmpty()
  propertieTitle: string;

  @IsNumber()
  @IsNotEmpty()
  propertiePrice: number;

  @IsString()
  @IsNotEmpty()
  propertieDescription: string;

  @IsUrl()
  @IsNotEmpty()
  propertieImage: string;
}
