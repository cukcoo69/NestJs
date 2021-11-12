import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from './entities/order.entity';
import { OrderStatusEnum } from './enums/order-status.enum';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { pinCodeGenerator } from './utils/order.util';

@Injectable()
export class OrderService {
  constructor(protected readonly orderRepository: OrderRepository) {}

  getAll(): Promise<OrderDocument[]> {
    return this.orderRepository.getAll();
  }

  create(orderDto: CreateOrderDto): Promise<OrderDocument> {
    const order = new Order();
    Object.assign(order, orderDto);
    order.status = OrderStatusEnum.CREATED;
    order.createdDate = new Date();
    order.pin = pinCodeGenerator();
    return this.orderRepository.create(order);
  }

  getById(id: string): Promise<OrderDocument> {
    return this.orderRepository.getById(id);
  }

  getByStatus(status: OrderStatusEnum): Promise<OrderDocument[]> {
    return this.orderRepository.getByStatus(status);
  }

  updateStatus(ids: string[], newStatus: OrderStatusEnum) {
    return this.orderRepository.updateStatus(ids, newStatus);
  }
}
