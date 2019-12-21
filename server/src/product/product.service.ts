import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) {}

    private toResponseObject(product: ProductEntity) {
        if (!product.owner) {
            return product;
        }
        return { ...product, owner: product.owner.toResponseObject(false) };
    }

    async showAll() {
        const products = await this.productRepository.find({
            relations: ['owner'],
        });
        return products.map(product => this.toResponseObject(product));
    }

    async create(data: ProductDTO) {
        const product = this.productRepository.create(data);
        await this.productRepository.save(product);
        return product;
    }

    async get(id: string) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return this.toResponseObject(product);
    }

    async update(id: string, data: Partial<ProductDTO>) {
        if (data.owner) {
            throw new HttpException(
                'Owner cannot be updated through this call',
                HttpStatus.FORBIDDEN,
            );
        }
        let product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        await this.productRepository.update({ id }, data);
        product = await this.productRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        return this.toResponseObject(product);
    }

    async destroy(id: string) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        await this.productRepository.delete({ id });
        return { deleted: true };
    }
}
