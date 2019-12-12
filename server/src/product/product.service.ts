import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) 
        private productRepository: Repository<ProductEntity>
        ) {}

    async showAll() {
        return await this.productRepository.find();
    }

    async create(data: ProductDTO) {
        const product = await this.productRepository.create(data);
        await this.productRepository.save(product);
        return product;
    }

    async get(id: string) {
        return await this.productRepository.findOne({ where: { id } });
    }

    async update(id: string, data: Partial<ProductDTO>) {
        await this.productRepository.update({ id }, data);
        return await this.productRepository.findOne({ id });
    }

    async destroy(id: string) {
        await this.productRepository.delete({ id });
        return { deleted: true };
    }
}
