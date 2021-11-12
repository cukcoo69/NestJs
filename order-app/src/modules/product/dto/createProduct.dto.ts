import { ApiProperty } from '@nestjs/swagger';
import { ProductBrandEnum } from '../enums/productBrand.enum';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly brandName: ProductBrandEnum;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
