import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.module';
import { CategoryController } from './category.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [CategoryController],
  providers: [],
})
export class CategoryModule {}
