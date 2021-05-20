import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  Logger,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ClientProxy
} from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CategoryId } from 'src/domain/micro-admin-backend/general.types';
import { ProxyRMQProvider } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.provider';
import { IdValidationPipe } from '../../common/pipes/id.validation';
import { CategoryDTO } from './category.dto';

@Controller('v1/categories')
@ApiTags('Categories')
export class CategoryController {
  private logger = new Logger(CategoryController.name);

  private clientCategory : ClientProxy;

  constructor(
    private readonly clientProxyRMQ: ProxyRMQProvider,
  ) {
    this.clientCategory = this.clientProxyRMQ.getClientProxyAdminBackendInstance();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAllCategories(): Observable<any> {
    return this.clientCategory.send('find-categories', '');
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('/:id')
  findCategoryById(@Param('id') id: CategoryId): Observable<any> {
    return this.clientCategory.send('find-categories', id );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() data: CategoryDTO) {
    this.clientCategory.emit('create-category', data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCategoryById(
    @Body() data: CategoryDTO,
    @Param('id', IdValidationPipe) id: CategoryId,
  ) {
    this.clientCategory.emit('update-category', { category : data, id });
  }
  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete('/:id')
  async deleteCategoryById(@Param('id', IdValidationPipe) id: CategoryId) {
    this.clientCategory.emit('delete-category', { id });
  }

}
