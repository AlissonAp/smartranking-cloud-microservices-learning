import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './infrastructure/config/config.service';
import { AllHttpExceptionsFilter } from './application/common/filters/http-exception.filter';
import { LoggingInterceptor } from './application/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './application/common/interceptors/timeout.interceptor';

export { bootstrap };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllHttpExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(
    new TimeoutInterceptor(Number(configService.get('API_GATEWAY_TIMEOUT'))),
  );

  const options = new DocumentBuilder()
    .setTitle('SmartRanking')
    .setBasePath('/')
    .setDescription(
      'API to manage rankings and challenges between tênis players!',
    )
    .setVersion('1.0.0')
    .addTag('Categories')
    .addTag('Players')
    .addTag('Challenges')
    .addTag('Rankings')
    .addTag('Authentication')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const categoriesDocument = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/v1/documentation', app, categoriesDocument);

  const port = configService.get('PORT') || 3000;

  await app.listen(port);

  return app;
}

bootstrap();
