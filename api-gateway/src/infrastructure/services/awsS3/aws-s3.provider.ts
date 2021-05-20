import { ConfigService } from 'src/infrastructure/config/config.service';
import * as AWS from 'aws-sdk';

export const AWSFileProvider = [
  {
    provide: 'AWS-S3-FILE-STORAGE',
    useFactory: async (config: ConfigService) => {
      return new AWS.S3({
        accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
        region: config.get('AWS_REGION'),
      });
    },
    inject: [ConfigService],
  },
];
