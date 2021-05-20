import { ConfigService } from 'src/infrastructure/config/config.service';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const AWSAuthProvider = [
  {
    provide: 'AWS-COGNITO-AUTH-PROVIDER',
    useFactory: async (config: ConfigService) => {
      return new CognitoUserPool({
        UserPoolId: config.get('AWS_COGNITO_POOL_ID'),
        ClientId: config.get('AWS_COGNITO_CLIENT_ID'),
      });
    },
    inject: [ConfigService],
  },
];