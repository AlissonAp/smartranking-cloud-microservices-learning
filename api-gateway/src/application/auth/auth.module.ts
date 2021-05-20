import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { AWSCognitoModule } from 'src/infrastructure/services/awsCognito/aws-cognito.module';
import { AWSAuthRepository } from 'src/infrastructure/services/awsCognito/aws-cognito.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth-jwt.strategy';

@Module({
  imports: [ConfigModule, AWSCognitoModule, PassportModule.register({
    defaultStrategy : 'jwt'
  })],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    AWSAuthRepository,
    
  ],
  exports: [AuthService],
})
export class AuthModule {}
