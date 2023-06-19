import * as Joi from 'joi';
import { Environments } from './config.constants';

export const envVarsValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(Environments.DEVELOPMENT, Environments.PRODUCTION, Environments.TEST)
    .required(),

  PORT: Joi.number().required(),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SSL: Joi.boolean().required(),
});
