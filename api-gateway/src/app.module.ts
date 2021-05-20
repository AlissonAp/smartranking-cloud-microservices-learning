import { Module } from '@nestjs/common';
import { CategoryModule } from './application/micro-admin-backend/categories/category.module';
import { PlayerModule } from './application/micro-admin-backend/players/player.module';
import { ChallengesModule } from './application/micro-challenges/challenge.module';
import { RankingsModule } from './application/micro-rankings/rankings.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { AWSS3Module } from './infrastructure/services/awsS3/aws-s3.module';
import { AWSCognitoModule } from './infrastructure/services/awsCognito/aws-cognito.module';
import { AuthModule } from './application/auth/auth.module';

@Module({
  imports: [ConfigModule, AWSS3Module, AWSCognitoModule, CategoryModule, PlayerModule, ChallengesModule, RankingsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
