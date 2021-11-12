import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { OrderStatusEnum } from './enums/order-status.enum';
import { ModelNameEnum } from './enums/model-name.enum';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(ModelNameEnum.ORDER)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getAll(): Promise<OrderDocument[]> {
    return this.orderModel.find();
  }

  async create(order: Order): Promise<OrderDocument> {
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }

  async getById(id: string): Promise<OrderDocument> {
    return this.orderModel.findById(id);
  }

  async getByStatus(status: OrderStatusEnum): Promise<OrderDocument[]> {
    return this.orderModel.find({ status: status });
  }

  updateStatus(ids: string[], newStatus: OrderStatusEnum) {
    return this.orderModel.updateMany(
      { _id: { $in: ids } },
      {
        $set: {
          status: newStatus,
        },
      },
      { new: true },
    );
  }
}
