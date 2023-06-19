import { Module } from '@nestjs/common';
import { ConfigModule as CnfModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { envVarsValidationSchema as validationSchema } from './config.validation';

@Module({
  imports: [
    CnfModule.forRoot({
      validationSchema,
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
