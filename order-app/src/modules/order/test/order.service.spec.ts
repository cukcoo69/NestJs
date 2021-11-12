import { OrderService } from '../order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from '../order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('OrderService', () => {
  let service: OrderService;

  const mockOrderRepository = {
    getById: jest.fn().mockImplementation((id) => {
      return {
        id: id,
        productName: expect.any(String),
        productPrice: expect.any(Number),
        productQuantity: expect.any(Number),
        receiverName: expect.any(String),
        receiverAddress: expect.any(String),
        receiverPhone: expect.any(String),
        status: expect.any(String),
        createdDate: expect.any(Number),
        pin: expect.any(Number),
      };
    }),
    create: jest.fn().mockImplementation((orderDto: CreateOrderDto) => {
      return {
        status: 'created',
        createdDate: expect.any(Number),
        pin: expect.any(Number),
        ...orderDto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, OrderRepository],
    })
      .overrideProvider(OrderRepository)
      .useValue(mockOrderRepository)
      .compile();

    service = module.get<OrderService>(OrderService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a order with same id', async () => {
    expect(await service.getById('123')).toEqual({
      id: '123',
      productName: expect.any(String),
      productPrice: expect.any(Number),
      productQuantity: expect.any(Number),
      receiverName: expect.any(String),
      receiverAddress: expect.any(String),
      receiverPhone: expect.any(String),
      status: expect.any(String),
      createdDate: expect.any(Number),
      pin: expect.any(Number),
    });
  });

  it('should return new order with status created', () => {
    const orderDto = {
      productName: 'Samsung flip',
      productPrice: 120,
      productQuantity: 2,
      receiverName: 'cuong',
      receiverAddress: 'hanoi',
      receiverPhone: '090909009',
    } as CreateOrderDto;
    expect(service.create(orderDto)).toEqual({
      ...orderDto,
      status: 'created',
      pin: expect.any(Number),
      createdDate: expect.any(Date),
    });
  });
});
