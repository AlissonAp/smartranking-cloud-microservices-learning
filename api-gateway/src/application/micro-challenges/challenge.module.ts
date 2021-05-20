import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.module';
import { ChallengeController } from './challenge.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [ChallengeController],
  providers: [

  ],
  exports: [],
})
export class ChallengesModule {}
