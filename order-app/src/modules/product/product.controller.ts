import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get()
  async getAll() {
    const products = await this.productService.getAll();
    return { total: products.length, data: products };
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }
}
