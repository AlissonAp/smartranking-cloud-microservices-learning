import {
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  Controller,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ChallengeId } from 'src/domain/challenges/challenge.types';
import { Challenge } from '../../domain/challenges/challenge.entity';
import { ExceptionFilterService } from '../common/exception-filter.service';
import {
  ChallengeCreateDTO,
  ChallengeUpdateDTO,
  MatchCreateDTO,
} from './challenge.dto';
import { ChallengeService } from './challenge.service';
import { ChallengeIdValidationPipe } from './challenge.validation';

@Controller()
export class ChallengeController {
  logger = new Logger(ChallengeController.name);

  constructor(private readonly challengeService: ChallengeService,
    private readonly exceptionFilterService: ExceptionFilterService) { }


  @MessagePattern('find-challenges')
  async findAllChallenges(@Payload() data: any, @Ctx() context: RmqContext): Promise<Challenge | Challenge[]> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      if (data.challengeId) {
        return await this.challengeService.findById(data.challengeId);
      }else if(data.playerId){
        return await this.challengeService.findByPlayer(data.playerId);
      }else if(data.challengeStatus && data.categoryId && data.challengeDate){
        return await this.challengeService.findByCategoryStatusAndDate(data.categoryId, data.challengeStatus, data.challengeDate);
      } else {
        return await this.challengeService.findAll();
      }
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw err;
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('create-challenge')
  async createChallenge(@Payload() data: ChallengeCreateDTO, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      await this.challengeService.create(data);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @EventPattern('update-challenge')
  async updateChallengeById(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.challengeService.updateById(data.id, data.challenge);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @EventPattern('delete-challenge')
  async deleteChallengeById(
    @Payload() id: ChallengeId, @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.challengeService.deleteById(id);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @EventPattern('assign-match-to-challenge')
  async assignMatchToChallenge(
    @Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.challengeService.assignMatchToChallenge(data.id, data.match);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

}
