import { Module } from '@nestjs/common';
import { ConfigModule } from '../infrastructure/config/config.module';
import { DatabaseModule } from '../infrastructure/services/mongoDB/database.module';
import { PlayersModule } from '../application/players/player.module';
import { CategoriesModule } from '../application/categories/category.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PlayersModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
