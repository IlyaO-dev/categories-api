import { DocumentBuilder } from '@nestjs/swagger';

export enum Environments {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Test Categories API')
  .setDescription('Documentation for a test API')
  .setVersion('1.0.0')
  .build();
