import { Module } from '@nestjs/common';
import { FileModule } from 'src/application/common/services/storage/file.module';
import { ProxyRMQModule } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.module';
import { PlayerController } from './player.controller';

@Module({
  imports: [ProxyRMQModule, FileModule],
  controllers: [PlayerController],
  providers: [],
})
export class PlayerModule {}
