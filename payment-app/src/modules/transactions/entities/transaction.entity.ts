import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TransactionStatusEnum } from '../enums/transaction.enum';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  status: TransactionStatusEnum;

  @Prop({ type: SchemaTypes.ObjectId })
  orderId: Types.ObjectId;

  @Prop()
  createdDate: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
