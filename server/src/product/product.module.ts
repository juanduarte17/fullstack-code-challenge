import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
    controllers: [ProductController],
    providers: [ProductService, UserService],
})
export class ProductModule {}
