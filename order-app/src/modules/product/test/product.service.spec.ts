import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../product.repository';
import { mongo } from 'mongoose';
import { ProductBrandEnum } from '../enums/productBrand.enum';

describe('ProductService', () => {
  let service: ProductService;

  const mockProductRepository = {
    getById: jest.fn().mockImplementation((id) => {
      return {
        id: id,
        description: expect.any(String),
        price: expect.any(Number),
        brandName: expect.any(String),
        image: expect.any(String),
        name: expect.any(String),
      };
    }),
    create: jest.fn().mockImplementation((product: Product) => {
      return {
        id: expect.any(mongo.ObjectId),
        ...product,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductRepository],
    })
      .overrideProvider(ProductRepository)
      .useValue(mockProductRepository)
      .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a order with same id', () => {
    expect(service.getById('123')).toEqual({
      id: '123',
      description: 'This is description',
      price: 120,
      brandName: ProductBrandEnum.IPHONE,
      image: 'image link',
      name: 'Iphone13',
    });
  });

  it('should return new product', async () => {
    const product = new Product();
    product.name = 'Phone';
    product.price = 200;
    product.image = 'google.com';
    product.brandName = ProductBrandEnum.SAMSUNG;
    product.description = 'this is a phone';
    expect(await service.create(product)).toEqual({
      id: new mongo.ObjectId(),
      ...product,
    });
  });
});
