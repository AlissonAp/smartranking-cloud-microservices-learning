import {
  Controller,
  Logger,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ExceptionFilterService } from '../common/exception-filter.service';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  logger = new Logger(NotificationController.name);

  constructor(private readonly notificationService: NotificationService,
    private readonly exceptionFilterService: ExceptionFilterService) { }

  @EventPattern('new-challenge-notification')
  async newChallengeNotification(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      this.notificationService.challengeNotification(data.challengeId);
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
