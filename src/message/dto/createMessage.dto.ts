import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class creteMessageDto {
  @IsString()
  @IsNotEmpty()
  'message': string;

  @IsString()
  @IsNotEmpty()
  'idMessage': string;

  @IsString()
  @IsNotEmpty()
  'idUser': string;
}

export class addMessageDto {
  @IsNumber()
  @IsNotEmpty()
  'id': number;

  @IsString()
  @IsNotEmpty()
  'from': string;

  @IsString()
  @IsNotEmpty()
  'to': string;

  @IsString()
  @IsNotEmpty()
  'message': string;
}

export class getMessageDto {
  @IsString()
  @IsNotEmpty()
  'from': string;

  @IsString()
  @IsNotEmpty()
  'to': string;
}
