import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { AWSSESProvider } from './aws-ses.provider';

@Module({
  imports: [ConfigModule],
  providers: [...AWSSESProvider],
  exports: [...AWSSESProvider],
})
export class AWSSESModule {}
