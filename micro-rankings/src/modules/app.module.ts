import { Module } from '@nestjs/common';
import { ConfigModule } from '../infrastructure/config/config.module';
import { DatabaseModule } from '../infrastructure/services/mongoDB/database.module';
import { RankingsModule } from '../application/rankings/ranking.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RankingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
