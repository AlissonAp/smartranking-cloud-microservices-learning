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
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PlayerId } from 'src/domain/players/player.types';
import { Player } from '../../domain/players/player.entity';
import { ExceptionFilterService } from '../common/exception-filter.service';
import { PlayerDTO } from './player.dto';
import { PlayerService } from './player.service';

@Controller()
export class PlayerController {
  logger = new Logger(PlayerController.name);

  constructor(
    private readonly playerService: PlayerService,
    private readonly exceptionFilterService: ExceptionFilterService,
  ) {}

  @MessagePattern('find-players')
  async findPlayers(
    @Payload() id: PlayerId,
    @Ctx() context: RmqContext,
  ): Promise<Player | Player[]> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      if (id) {
        return await this.playerService.findById(id);
      } else {
        return await this.playerService.findAll();
      }
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw err;
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('create-player')
  async createPlayer(@Payload() data: PlayerDTO, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.playerService.create(data);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @EventPattern('update-player')
  async updatePlayerById(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.playerService.updateById(data.id, data.player);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @EventPattern('delete-player')
  async deletePlayerById(@Payload() id: PlayerId, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.playerService.deleteById(id);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @EventPattern('upload-profile-photo')
  async uploadProfilePhoto(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.playerService.uploadProfilePhoto(data.id, data.url);
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
