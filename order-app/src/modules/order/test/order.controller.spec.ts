import { OrderController } from '../order.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { TransactionDto } from '../dto/transaction.dto';

describe('OrderController', () => {
  let controller: OrderController;

  const mockOrderService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
        createdDate: Date.now(),
        status: 'created',
        pin: expect.any(Number),
      };
    }),

    getById: jest.fn((id) => {
      return {
        id: id,
        productName: expect.any(String),
        productPrice: expect.any(Number),
        productQuantity: expect.any(Number),
        receiverName: expect.any(String),
        receiverAddress: expect.any(String),
        receiverPhone: expect.any(String),
        status: expect.any(String),
        createdDate: expect.any(Date),
        pin: expect.any(Number),
      };
    }),

    updateStatus: jest.fn(([id], status) => {
      return {
        id: id,
        productName: expect.any(String),
        productPrice: expect.any(Number),
        productQuantity: expect.any(Number),
        receiverName: expect.any(String),
        receiverAddress: expect.any(String),
        receiverPhone: expect.any(String),
        status: status,
        createdDate: expect.any(Date),
        pin: expect.any(Number),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: 'PAYMENT_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shout create a order', () => {
    const orderDto = {
      productName: 'phone',
      productPrice: 1000,
      productQuantity: 2,
      receiverName: 'James',
      receiverAddress: 'Hanoi',
      receiverPhone: '012345',
    };
    expect(controller.create(orderDto)).toEqual({
      productName: 'phone',
      productPrice: 1000,
      productQuantity: 2,
      receiverName: 'James',
      receiverAddress: 'Hanoi',
      receiverPhone: '012345',
      status: 'created',
      createdDate: expect.any(Number),
      pin: expect.any(Number),
    });
  });

  it('should get a document of order by id', () => {
    expect(controller.getById('id')).toEqual({
      id: 'id',
      productName: 'Iphone 13',
      productPrice: 150,
      productQuantity: 1,
      receiverName: 'Cukcoo',
      receiverAddress: 'Hanoi',
      receiverPhone: '0123456789',
      status: 'created',
      createdDate: new Date(),
      pin: 1234,
    });
  });

  it('status of order should be cancelled', () => {
    const transactionDtoDeclined = {
      orderId: '123',
      transactionResult: 'declined',
    } as TransactionDto;
    const id = '123';
    expect(controller.updateStatus(transactionDtoDeclined, id)).toEqual({
      id: '123',
      productName: 'Iphone 13',
      productPrice: 150,
      productQuantity: 1,
      receiverName: 'Cukcoo',
      receiverAddress: 'Hanoi',
      receiverPhone: '0123456789',
      status: 'cancelled',
      createdDate: new Date(),
      pin: 1234,
    });
  });
});
