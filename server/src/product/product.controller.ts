import { Controller, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    showAllProducts() {
        return this.productService.showAll();
    }

    @Post()
    createProduct(@Body() data: ProductDTO) {
        return this.productService.create(data);
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productService.get(id);
    }

    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() data: Partial<ProductDTO>) {
        return this.productService.update(id, data);
    }

    @Delete(':id')
    destroyProduct(@Param('id') id: string) {
        return this.productService.destroy(id);
    }

}
