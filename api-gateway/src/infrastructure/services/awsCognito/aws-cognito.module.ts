import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { AWSAuthProvider } from './aws-cognito.provider';

@Module({
  imports: [ConfigModule],
  providers: [...AWSAuthProvider],
  exports: [...AWSAuthProvider],
})
export class AWSCognitoModule {}
