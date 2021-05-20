import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.module';
import { RankingController } from './rankings.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [RankingController],
  providers: [

  ],
  exports: [],
})
export class RankingsModule {}
