import {
    Controller,
    Get,
    Put,
    Post,
    Delete,
    Body,
    Param,
    UsePipes,
    UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';

@Controller('api/products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    @UseGuards(new AuthGuard())
    showAllProducts() {
        return this.productService.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createProduct(@Body() data: ProductDTO) {
        return this.productService.create(data);
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    getProduct(@Param('id') id: string) {
        return this.productService.get(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    updateProduct(@Param('id') id: string, @Body() data: Partial<ProductDTO>) {
        return this.productService.update(id, data);
    }

    @Post(':id/images')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    updateProductImage(
        @Param('id') id: string,
        @Body() data: Partial<ProductDTO>,
    ) {
        return this.productService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyProduct(@Param('id') id: string) {
        return this.productService.destroy(id);
    }
}
