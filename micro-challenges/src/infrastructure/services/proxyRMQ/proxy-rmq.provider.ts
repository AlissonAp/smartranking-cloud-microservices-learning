import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService } from "../../config/config.service";

@Injectable()
export class ProxyRMQProvider {

    constructor(private readonly configService: ConfigService){}

    getClientRankingBackend(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [this.configService.get('RABBITMQ_MICRO_RANKING_URL')],
              queue: this.configService.get('RABBITMQ_MICRO_RANKING_QUEUE'),
            },
          });
    }

    getClientNotificationsBackend(): ClientProxy {
      return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [this.configService.get('RABBITMQ_MICRO_NOTIFICATIONS_URL')],
            queue: this.configService.get('RABBITMQ_MICRO_NOTIFICATIONS_QUEUE'),
          },
        });
  }


}

