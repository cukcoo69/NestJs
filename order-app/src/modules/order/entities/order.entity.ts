import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatusEnum } from '../enums/order-status.enum';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productPrice: number;

  @Prop({ required: true })
  productQuantity: number;

  @Prop({ required: true })
  receiverName: string;

  @Prop({ required: true })
  receiverAddress: string;

  @Prop({ required: true })
  receiverPhone: string;

  @Prop({ required: true })
  status: OrderStatusEnum;

  @Prop({ required: true })
  createdDate: Date;

  @Prop({ required: true })
  pin: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
