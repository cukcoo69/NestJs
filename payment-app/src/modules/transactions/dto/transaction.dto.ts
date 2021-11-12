import { TransactionStatusEnum } from '../enums/transaction.enum';

export class TransactionDto {
  orderId: string;

  transactionResult: TransactionStatusEnum;
}
