import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from '../transactions/transaction.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';

@Module({
  imports: [
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(configuration().mongoUrl),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
