import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { ProductBrandEnum } from '../enums/productBrand.enum';

describe('OrderController', () => {
  let controller: ProductController;
  const mockProductService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),

    getById: jest.fn((id) => {
      return {
        id: id,
        name: expect.any(String),
        image: expect.any(String),
        brandName: expect.any(String),
        price: expect.any(Number),
        description: expect.any(String),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shout create a product', () => {
    const productDto = {
      name: 'Phone',
      image: 'https://google',
      brandName: ProductBrandEnum.IPHONE,
      price: 100,
      description: 'this is phone',
    };
    expect(controller.create(productDto)).toEqual({
      name: 'Phone',
      image: 'https://google',
      brandName: ProductBrandEnum.IPHONE,
      price: 100,
      description: 'this is phone',
    });
  });

  it('Should return a product with same id', () => {
    const id = '123';
    expect(controller.getById(id)).toEqual({
      id: '123',
      name: 'Phone',
      image: 'https://google',
      brandName: ProductBrandEnum.IPHONE,
      price: 100,
      description: 'this is phone',
    });
  });
});
