import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity])],
    controllers: [UserController],
    providers: [UserService, ProductService],
})
export class UserModule {}
