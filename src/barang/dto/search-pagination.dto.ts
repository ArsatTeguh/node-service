import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"


export class SearchAndPagination {
    @IsString()
    @IsOptional()
    "name": string

    @IsNumber()
    @IsOptional()
    "price": number

    @IsArray()
    @IsOptional()
    "category": Array<number>

    @IsNumber()
    @IsOptional()
    "page": number

    @IsNumber()
    @IsOptional()
    "size": number
}
