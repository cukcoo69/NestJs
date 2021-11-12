import { TransactionStatusEnum } from '../enums/transaction.enum';

export const transactionStatusGenerator = (): TransactionStatusEnum => {
  return Math.random() < 0.5
    ? TransactionStatusEnum.CONFIRMED
    : TransactionStatusEnum.DECLINED;
};
