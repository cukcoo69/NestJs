import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Transport } from '@nestjs/microservices';
import { QueueName } from './modules/transactions/enums/rabbit.enum';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configuration().amqpUrl],
      queue: QueueName.PAYMENT_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
}
bootstrap();
