import { Controller, Get, Put, Post, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    showAllProducts() {
        return this.productService.showAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(@Body() data: ProductDTO) {
        return this.productService.create(data);
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productService.get(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateProduct(@Param('id') id: string, @Body() data: Partial<ProductDTO>) {
        return this.productService.update(id, data);
    }

    @Delete(':id')
    destroyProduct(@Param('id') id: string) {
        return this.productService.destroy(id);
    }

}
