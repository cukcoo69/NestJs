import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusEnum } from './enums/order-status.enum';
import { pinCodeGenerator } from './utils/order.util';
import { ApiTags } from '@nestjs/swagger';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TransactionStatusEnum } from './enums/transaction.enum';
import { TransactionDto } from './dto/transaction.dto';
import { ClientProxy } from '@nestjs/microservices';
import { EventPattern, RegisterName } from './enums/rabit.enum';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject(RegisterName.PAYMENT_SERVICE) private client: ClientProxy,
  ) {}
  private readonly logger = new Logger(OrderService.name);

  @Get()
  async getAll() {
    const orders = await this.orderService.getAll();
    return { total: orders.length, data: orders };
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.orderService.getById(id);
  }

  @Post()
  create(@Body() orderDto: CreateOrderDto) {
    return this.orderService.create(orderDto);
  }

  @Post('/pay')
  async pay(@Body() orderDto: CreateOrderDto) {
    const order = new Order();
    Object.assign(order, orderDto);
    order.status = OrderStatusEnum.CREATED;
    order.createdDate = new Date();
    order.pin = pinCodeGenerator();
    const newOrder = await this.orderService.create(order);
    this.client.emit(EventPattern.PAYMENT, newOrder._id);
    return newOrder;
  }

  @Put('/:id/status')
  updateStatus(@Body() transaction: TransactionDto, @Param('id') id: string) {
    const newStatus =
      transaction.transactionResult === TransactionStatusEnum.CONFIRMED
        ? OrderStatusEnum.CONFIRMED
        : OrderStatusEnum.CANCELLED;

    if (id !== transaction.orderId) {
      throw new HttpException('Bad request', 400);
    }

    return this.orderService.updateStatus([transaction.orderId], newStatus);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async deliveryOrder() {
    const confirmedOrders = await this.orderService.getByStatus(
      OrderStatusEnum.CONFIRMED,
    );
    const listIds = confirmedOrders.map((order) => order.id);
    this.logger.log('===== Cron job to update confirmed to delivered =====');
    this.logger.log(`===== list id update: ${listIds} =====`);
    await this.orderService.updateStatus(listIds, OrderStatusEnum.DELIVERED);
  }
}
