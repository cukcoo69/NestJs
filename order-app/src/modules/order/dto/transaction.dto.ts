import { TransactionStatusEnum } from '../enums/transaction.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty()
  readonly orderId: string;

  @ApiProperty()
  readonly transactionResult: TransactionStatusEnum;
}
