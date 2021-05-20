import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class ProxyRMQProvider {
  constructor(private readonly configService: ConfigService) {}

  getClientProxyAdminBackendInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('RABBITMQ_MICRO_ADMIN_URL')],
        queue: this.configService.get('RABBITMQ_MICRO_ADMIN_QUEUE'),
      },
    });
  }

  getClientProxyChallengesBackendInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('RABBITMQ_MICRO_CHALLENGES_URL')],
        queue: this.configService.get('RABBITMQ_MICRO_CHALLENGES_QUEUE'),
      },
    });
  }

  getClientProxyRankingsBackendInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('RABBITMQ_MICRO_RANKINGS_URL')],
        queue: this.configService.get('RABBITMQ_MICRO_RANKINGS_QUEUE'),
      },
    });
  }

  ;
}
