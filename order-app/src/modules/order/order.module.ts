import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderRepository } from './order.repository';
import { QueueName, RegisterName } from './enums/rabit.enum';
import configuration from '../../config/configuration';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ClientsModule.register([
      {
        name: RegisterName.PAYMENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [configuration().amqpUrl],
          queue: QueueName.PAYMENT_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
