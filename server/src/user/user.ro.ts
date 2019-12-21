import { ProductEntity } from '../product/product.entity';

export class UserResponseObject {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    products?: ProductEntity[];
    token?: string;
}
