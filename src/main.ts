import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const env = configService.get('app.env');
  const port = configService.get('app.http.port');
  const globalPrefix = configService.get('app.globalPrefix');

  // Some Node.js libs and frameworks will only enable production-related
  // optimization if they dectect that the NODE_ENV env var set to production
  process.env.NODE_ENV = env;

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // See config/app.config.ts L15
  app.setGlobalPrefix(globalPrefix);

  // setup global validation pipe for api parameter validations
  app.useGlobalPipes(new ValidationPipe());

  // setup global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // setup global request/response logging
  app.useGlobalInterceptors(new LoggingInterceptor());

  // For the downstream services, we should create an endpoint
  // for healthcheck; a hybrid microservice consumer
  await app.listen(port);

  const logger = new Logger();
  logger.log(`Server running on ${await app.getUrl()}`, 'NestApplication');

  await app.startAllMicroservices();
}

bootstrap();
