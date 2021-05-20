import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

type EnvConfig = {
  [key: string]: string;
};

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
      API_GATEWAY_PORT: Joi.number(),
      API_GATEWAY_TIMEOUT: Joi.number(),
      RABBITMQ_MICRO_ADMIN_URL: Joi.string(),
      RABBITMQ_MICRO_ADMIN_QUEUE: Joi.string(),
      RABBITMQ_MICRO_CHALLENGES_URL: Joi.string(),
      RABBITMQ_MICRO_CHALLENGES_QUEUE: Joi.string(),
      RABBITMQ_MICRO_RANKINGS_URL: Joi.string(),
      RABBITMQ_MICRO_RANKINGS_QUEUE: Joi.string(),
      AWS_REGION: Joi.string(),
      AWS_ACCESS_KEY_ID: Joi.string(),
      AWS_SECRET_ACCESS_KEY: Joi.string(),
      AWS_BUCKET_NAME: Joi.string(),
      AWS_COGNITO_POOL_ID: Joi.string(),
      AWS_COGNITO_CLIENT_ID: Joi.string(),
      AWS_COGNITO_AUTHORITY_ENDPOINT: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = envVarSchema.validate(
      envConfig,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
