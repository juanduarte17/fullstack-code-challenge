import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user.dto';
import { ProductEntity } from 'src/product/product.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private userRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
        ) {}
    
    async create(data: UserDTO) {
        let userExist = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (!userExist) {
            let user = await this.userRepository.create(data);
            user = await this.userRepository.save(user);
            Logger.log(`User ${user.firstName} ${user.lastName} created`, 'UserService: create()');
        } else {
            Logger.error('User already exist', '','UserService: create()');
        }  
    }

    async showAll() {
        const users = await this.userRepository.find({relations: ['products']});
        return users.map(user => user.toResponseObject(false));
    }

    async getProducts(userID: string) {
        const user = await this.userRepository.findOne({ 
            where: { id: userID },
            relations: ['products']
        });
        return user.toResponseObject(false).products;
    }

    async attach(userID: string, productID: string) {
        const user = await this.userRepository.findOne({ 
            where: { id: userID },
            relations: ['products']
        });
        const product = await this.productRepository.findOne(
            { where: { id: productID },
            relations: ['owner']
        });
        if (product.owner) {
            throw new HttpException('Product is already owned', HttpStatus.FORBIDDEN);
        }
        product.owner = user;
        await this.productRepository.update({ id: productID }, product);

        // to avoid circular dependency 
        delete  product.owner;

        user.products.push(product);
        return user.toResponseObject();
    }

    async deattach(userID: string, productID: string) {
        const user = await this.userRepository.findOne({ 
            where: { id: userID },
            relations: ['products']
        });
        const product = await this.productRepository.findOne(
            { where: { id: productID },
            relations: ['owner']
        });

        if (userID !== product.owner.id) {
            throw new HttpException('Used logged in does not own this product', HttpStatus.FORBIDDEN);
        }

        product.owner = null;
        user.products = user.products.map(product => {
            if (product.id !== productID) {
                return product;
            }
        });
        
        await this.productRepository.update({ id: productID }, product);
        return user.toResponseObject();
    }

    async login(data: UserDTO) {
        const {email, password } = data
        let user = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
        }

        return user.toResponseObject();
    }
}
