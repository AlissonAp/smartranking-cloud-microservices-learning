import { Module } from '@nestjs/common';
import { ConfigModule } from '../infrastructure/config/config.module';
import { DatabaseModule } from '../infrastructure/services/mongoDB/database.module';
import { ChallengesModule } from '../application/challenges/challenge.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
