import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductBrandEnum } from '../enums/productBrand.enum';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  brandName: ProductBrandEnum;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
