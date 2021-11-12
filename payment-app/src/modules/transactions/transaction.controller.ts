import { Controller, Logger } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { EventPattern } from '@nestjs/microservices';
import { EventPatternName } from './enums/rabbit.enum';

@Controller('payment')
@ApiTags('Payments')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  private readonly logger = new Logger(TransactionController.name);

  @EventPattern(EventPatternName.PAYMENT)
  async pay(data: any) {
    await this.transactionService.pubSubHandler(data);
  }
}
