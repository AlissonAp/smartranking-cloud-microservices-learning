import {
  Controller,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { IRankingResponse } from 'src/domain/rankings/ranking.interfaces';
import { ExceptionFilterService } from '../common/exception-filter.service';
import { RankingService } from './ranking.service';
import { RankingIdValidationPipe } from './ranking.validation';

@Controller()
export class RankingController {
  logger = new Logger(RankingController.name);

  constructor(private readonly rankingService: RankingService,
    private readonly exceptionFilterService: ExceptionFilterService) { }


  @EventPattern('process-match')
  async createRanking(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      await this.rankingService.processMatch(data.id, data.match);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @MessagePattern('find-rankings')
  async findCategories(@Payload() data: any, @Ctx() context: RmqContext): Promise<IRankingResponse | IRankingResponse[]> {

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
        return await this.rankingService.findByCategory(data.categoryId, data.dateRef);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw err;
    } finally {
      await channel.ack(originalMsg);
    }

  }

}
