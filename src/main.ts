import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '../lib/config/src';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { swaggerConfig } from '../lib/config/src/config.constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const port = config.port;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (!config.isProduction) {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }
  app.useGlobalInterceptors(new LoggingInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, () =>
    Logger.log(`Server started on port ${port}`, 'Main'),
  );
}

bootstrap();
