import { IsString, IsNumber } from 'class-validator'

export class ProductDTO {
    @IsString()
    name: string;
    
    @IsString()
    description: string;
    
    @IsNumber()
    price: number;
}