import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class addTransaksiDto {
  @IsString()
  @IsNotEmpty()
  'name': string;

  @IsNumber()
  @IsNotEmpty()
  'count': number;
}
