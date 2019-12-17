import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/user.entity';
import { ProductEntity } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/logging.interceptor';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT || 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [UserEntity, ProductEntity],
            synchronize: true,
            logging: true,
        }),
        ProductModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        AppService,
    ],
})
export class AppModule {}
