import { Injectable } from '@nestjs/common';
import { ProductDocument } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  create(product: CreateProductDto): Promise<ProductDocument> {
    return this.repository.create(product);
  }

  getAll(): Promise<ProductDocument[]> {
    return this.repository.getAll();
  }

  getById(id: string) {
    return this.repository.getById(id);
  }
}
