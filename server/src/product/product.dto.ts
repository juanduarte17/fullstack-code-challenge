import { IsString, IsNumber } from 'class-validator'
import { UserEntity } from 'src/user/user.entity';

export class ProductDTO {
    @IsString()
    name: string;
    
    @IsString()
    description: string;
    
    @IsNumber()
    price: number;

    owner?: UserEntity;
}