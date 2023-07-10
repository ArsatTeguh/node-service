import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class BarangDto {

    @IsOptional()
    "thumbnail"?: string | undefined


    @IsOptional()
    "variants"?: Record<string, any>; // Mengganti JSON menjadi Record<string, any>

    @IsString()
    @IsNotEmpty()
    "name": string

    @IsNumber()
    @IsNotEmpty()
    "price": number

    @IsNumber()
    @IsNotEmpty()
    "stock": number

    @IsString()
    @IsNotEmpty()
    "category": string
}
