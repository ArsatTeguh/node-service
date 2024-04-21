import { IsNotEmpty, IsString, IsNumber, IsTimeZone } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  'username': string;

  @IsString()
  @IsNotEmpty()
  'email': string;

  @IsString()
  @IsNotEmpty()
  'password': string;
}

export class IResponseUser {
  @IsString()
  @IsNotEmpty()
  'username': string;

  @IsNumber()
  @IsNotEmpty()
  'id': number;

  @IsString()
  @IsNotEmpty()
  'image': string;

  @IsTimeZone()
  @IsNotEmpty()
  'createdAt': Date;

  @IsTimeZone()
  @IsNotEmpty()
  'updatedAt': Date;
}
