import { ConfigService } from 'src/infrastructure/config/config.service';
import * as AWS from 'aws-sdk';

export const AWSSESProvider = [
  {
    provide: 'AWS-SES-MAIL',
    useFactory: async (config: ConfigService) => {
      return new AWS.SESV2({
        accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
        region: config.get('AWS_REGION'),
      });
    },
    inject: [ConfigService],
  },
];
