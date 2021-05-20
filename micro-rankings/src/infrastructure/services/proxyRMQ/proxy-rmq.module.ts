import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ProxyRMQProvider } from './proxy-rmq.provider';

@Module({
    imports : [ConfigModule],
    providers: [ProxyRMQProvider],
    exports: [ProxyRMQProvider]
})
export class ProxyRMQModule {}