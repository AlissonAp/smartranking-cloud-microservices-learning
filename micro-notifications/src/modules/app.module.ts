import { Module } from '@nestjs/common';
import { ConfigModule } from '../infrastructure/config/config.module';
import { NotificationModule } from '../application/notifications/notification.module';
import { AWSSESModule } from '../infrastructure/services/awsSES/aws-ses.module';

@Module({
  imports: [
    ConfigModule,
    AWSSESModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
