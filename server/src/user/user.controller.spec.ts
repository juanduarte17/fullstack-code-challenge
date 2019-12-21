import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from '../product/product.entity';
import { UserService } from './user.service';
import { ProductService } from '../product/product.service';
import { Repository, UpdateResult } from 'typeorm';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcryptjs';

describe('User Controller', () => {
    let controller: UserController;
    let userRepo: Repository<UserEntity>;
    let productRepo: Repository<ProductEntity>;
    let baseTestUser: UserEntity;
    let baseTestProduct: ProductEntity;

    beforeEach(async () => {
        process.env = Object.assign(process.env, { SECRET: 'valkajsl;dfkasfsaue' });
        process.env = Object.assign(process.env, { IS_SEEDING_USERS: 'false' });
        const mock_AuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService, 
                ProductService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(ProductEntity),
                    useClass: Repository,
                }
            ],
        })
        .overrideProvider(AuthGuard).useValue(mock_AuthGuard)
        .overrideGuard(AuthGuard).useValue(mock_AuthGuard)
        .compile();

        controller = module.get<UserController>(UserController);
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

    it('should return for showAllUsers', async () => {
        jest.spyOn(userRepo, 'find').mockResolvedValueOnce([baseTestUser]);
        expect(await controller.showAllUsers()).toEqual([baseTestUser.toResponseObject(false)]);
    });

    it('should return getUserProducts', async () => {
        baseTestUser.products = [baseTestProduct];

        jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(baseTestUser);
        expect(await controller.getUserProducts(baseTestUser.id)).toEqual([baseTestProduct]);
    });

    it('should add product to user on attachProduct', async () => {
        const mockUpdateResult = new UpdateResult();

        jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(baseTestUser);
        jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(baseTestProduct);
        jest.spyOn(productRepo, 'update').mockResolvedValueOnce(mockUpdateResult);
        const updatedUser = await controller.attachProduct(baseTestUser.id, baseTestProduct.id);

        expect(updatedUser.products).toEqual([baseTestProduct]);
    });
    
    it('should remove product to user on deattachProduct', async () => {
        const mockUpdateResult = new UpdateResult();
        baseTestUser.products = [baseTestProduct];
        baseTestProduct.owner = baseTestUser;

        jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(baseTestUser);
        jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(baseTestProduct);
        jest.spyOn(productRepo, 'update').mockResolvedValueOnce(mockUpdateResult);
        const updatedUser = await controller.deattachProduct(baseTestUser.id, baseTestProduct.id);

        expect(updatedUser.products).toEqual([]);
    });

    it('should login', async () => {
        baseTestUser.password = await bcrypt.hash('MockPass', 10);
        let userDTO = new UserDTO();
        userDTO.email = 'mock@gmail.com';
        userDTO.password = 'MockPass';

        jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(baseTestUser);
        expect(await controller.login(userDTO)).toEqual(baseTestUser.toResponseObject());
    });
});
