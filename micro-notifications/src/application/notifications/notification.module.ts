import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { NotificationService } from './notification.service';
import { ExceptionFilterService } from '../common/exception-filter.service';
import { ProxyRMQModule } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.module';
import { AWSSESModule } from 'src/infrastructure/services/awsSES/aws-ses.module';
import { AWSNotificationRepository } from 'src/infrastructure/services/awsSES/aws-ses.repository';
import { NotificationController } from './notification.controller';

@Module({
  imports: [ConfigModule, AWSSESModule, ProxyRMQModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    AWSNotificationRepository,
    ExceptionFilterService,
    
  ],
  exports: [NotificationService],
})
export class NotificationModule {}