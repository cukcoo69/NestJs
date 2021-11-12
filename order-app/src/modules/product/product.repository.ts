import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  create(productDto: CreateProductDto): Promise<ProductDocument> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  getAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  getById(id: string) {
    return this.productModel.findById(id);
  }
}
