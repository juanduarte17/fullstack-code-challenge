import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from '../user/user.entity';
import { ProductController } from './product.controller';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';

describe('ProductService', () => {
    let service: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                ProductService, 
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(ProductEntity),
                    useClass: Repository,
                }
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
