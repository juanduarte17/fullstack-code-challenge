import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from '../user/user.entity';
import { ProductService } from './product.service';
import { UserService } from '../user/user.service';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ProductDTO } from './product.dto';

describe('Product Controller', () => {
    let controller: ProductController;
    let userRepo: Repository<UserEntity>;
    let productRepo: Repository<ProductEntity>;
    let baseTestUser: UserEntity;
    let baseTestProduct: ProductEntity;

    beforeEach(async () => {
        process.env = Object.assign(process.env, { SECRET: 'valkajsl;dfkasfsaue' });
        process.env = Object.assign(process.env, { IS_SEEDING_USERS: 'false' });
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

        controller = module.get<ProductController>(ProductController);
        userRepo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
        productRepo = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));

        baseTestProduct = new ProductEntity();
        baseTestProduct.id = "aee59b76-513f-448f-9cd6-c47117a1dbe8";
        baseTestProduct.name = "iPhone 11";
        baseTestProduct.description = "apple phone";
        baseTestProduct.price = 1.00;
        baseTestProduct.image = null;
        baseTestProduct.owner = null;

        baseTestUser = new UserEntity();
        baseTestUser.id = '23ce9429-0200-4c3c-a12f-d920ca636819';
        baseTestUser.email = 'mock@gmail.com';
        baseTestUser.firstName = 'Robert';
        baseTestUser.lastName = "');DROP TABLES Students;";
        baseTestUser.products = [];
        baseTestUser.password = 'fasdf';
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return for showAllProducts', async () => {
        jest.spyOn(productRepo, 'find').mockResolvedValueOnce([baseTestProduct]);
        expect(await controller.showAllProducts()).toEqual([baseTestProduct]);
    });

    it('should return getProduct', async () => {
        jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(baseTestProduct);
        expect(await controller.getProduct(baseTestProduct.id)).toEqual(baseTestProduct);
    });

    it('should createProduct', async () => {
        let productDTO = new ProductDTO();
        productDTO.name = 'iPhone 11';
        productDTO.description = 'apple phone';
        productDTO.price = 1;

        jest.spyOn(productRepo, 'create').mockReturnValue(baseTestProduct);
        jest.spyOn(productRepo, 'save').mockResolvedValueOnce(baseTestProduct);
        expect(await controller.createProduct(productDTO)).toEqual(baseTestProduct);
    });

    it('should updateProduct', async () => {
        const mockUpdateResult = new UpdateResult();
        let productDTO = new ProductDTO();
        productDTO.name = 'iPhone 6';
        productDTO.description = 'apple phone 2';
        productDTO.price = 1;

        jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(baseTestProduct);
        baseTestProduct.name = 'iPhone 6';
        jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(baseTestProduct);
        jest.spyOn(productRepo, 'update').mockResolvedValueOnce(mockUpdateResult);
        const updatedProduct = await controller.updateProduct(baseTestProduct.id, productDTO);

        expect(updatedProduct.name).toEqual(productDTO.name);
    });

    it('should destroyProduct', async () => {
        const mockUpdateResult = new DeleteResult();
        jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(baseTestProduct);
        jest.spyOn(productRepo, 'delete').mockResolvedValueOnce(mockUpdateResult);
        expect(await controller.destroyProduct(baseTestProduct.id)).toEqual({deleted: true});
    });
});
