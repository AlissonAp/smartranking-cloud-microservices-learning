import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CategoryId } from 'src/domain/categories/category.types';
import { Category } from '../../domain/categories/category.entity';
import { ExceptionFilterService } from '../common/exception-filter.service';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  logger = new Logger(CategoryController.name);

  constructor(
    private readonly categoryService: CategoryService,
    private readonly exceptionFilterService: ExceptionFilterService,
  ) {}

  @MessagePattern('find-categories')
  async findCategories(
    @Payload() id: CategoryId,
    @Ctx() context: RmqContext,
  ): Promise<Category | Category[]> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      if (id) {
        return await this.categoryService.findById(id);
      } else {
        return await this.categoryService.findAll();
      }
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw err;
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('create-category')
  async createCategory(
    @Payload() data: CategoryDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.categoryService.create(data);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @EventPattern('update-category')
  async updateCategoryById(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.categoryService.updateById(data.id, data.category);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }

  @EventPattern('delete-category')
  async deleteCategoryById(
    @Payload() id: CategoryId,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.categoryService.deleteById(id);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      if (this.exceptionFilterService.isAckException(err)) {
        await channel.ack(originalMsg);
      }
      throw err;
    }
  }
}
