import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from './infrastructure/config/config.service';
import { AllRpcExceptionsFilter } from './domain/common/filters/rpc-exception.filter';
import * as momentTz from 'moment-timezone';

const logger = new Logger('Main');

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URL')],
      queue: configService.get('RABBITMQ_QUEUE'),
      noAck: false,
    },
  });

  Date.prototype.toJSON = function (): any {
    return momentTz(this)
      .tz(configService.get('APP_TIMEZONE'))
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  app.useGlobalFilters(new AllRpcExceptionsFilter());

  await app.listen(() =>
    logger.log(`${configService.get('APP_NAME')} microservice is listening!`),
  );

  appContext.close();
}
bootstrap();
