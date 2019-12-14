import { IsString } from 'class-validator';
import { ProductEntity } from 'src/product/product.entity';

export class UserDTO {
    @IsString()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;
}

export class UserResponseObject {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    products?: ProductEntity[];
    token?: string;
}