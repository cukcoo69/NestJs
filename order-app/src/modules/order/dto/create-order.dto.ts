import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly productName: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly productPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  readonly productQuantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly receiverName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly receiverAddress: string;

  @ApiProperty()
  @IsString()
  @Length(10, 10)
  @IsNotEmpty()
  readonly receiverPhone: string;
}
