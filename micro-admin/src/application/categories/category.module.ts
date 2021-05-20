import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/services/mongoDB/database.module';
import { MongoDbCategoryRepository } from '../../infrastructure/repositories/categories/mongoDB/mongo-db-category.repository';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryProvider } from '../../infrastructure/repositories/categories/mongoDB/mongo-db-category.provider';
import { PlayersModule } from '../players/player.module';
import { ExceptionFilterService } from '../common/exception-filter.service';

@Module({
  imports: [DatabaseModule, PlayersModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    ...CategoryProvider,
    MongoDbCategoryRepository,
    ExceptionFilterService,
  ],
  exports: [CategoryService],
})
export class CategoriesModule {}
