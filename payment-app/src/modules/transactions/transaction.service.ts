import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import { transactionStatusGenerator } from './utils/transaction.util';
import * as mongoose from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import { HttpService } from '@nestjs/axios';
import { ModuleNameEnum } from './enums/module-name.enum';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(ModuleNameEnum.TRASACTION)
    private readonly transactionModel: Model<TransactionDocument>,
    private httpService: HttpService,
  ) {}

  private readonly logger = new Logger(TransactionService.name);

  async create(transaction: Transaction): Promise<TransactionDocument> {
    const newTransaction = new this.transactionModel(transaction);
    return await newTransaction.save();
  }

  async getAll(): Promise<TransactionDocument[]> {
    return await this.transactionModel.find().exec();
  }

  public async pubSubHandler(orderId: any) {
    this.logger.log('====== Transaction service is processing ======');
    const status = transactionStatusGenerator();
    const newTransaction = new Transaction();
    newTransaction.status = status;
    newTransaction.orderId = new mongoose.Types.ObjectId(orderId);
    newTransaction.createdDate = new Date();
    await this.create(newTransaction);
    const transactionInfo = new TransactionDto();
    transactionInfo.transactionResult = status;
    transactionInfo.orderId = orderId;
    this.httpService
      .put(
        `http://order-app:8081/api/orders/${orderId}/status`,
        transactionInfo,
      )
      .subscribe((res) =>
        this.logger.log(`=====Transaction is ${res.statusText}=====`),
      );
  }
}
