import {
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  Controller,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PlayerId } from 'src/domain/micro-admin-backend/general.types';
import { PlayerDTO } from './player.dto';
import { IdValidationPipe } from '../../common/pipes/id.validation';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProxyRMQProvider } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.provider';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/application/common/services/storage/file.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('v1/players')
@ApiTags('Players')
export class PlayerController {
  private clientAdmin: ClientProxy;

  constructor(
    private readonly clientProxyRMQ: ProxyRMQProvider,
    private readonly fileService: FileService,
  ) {
    this.clientAdmin = this.clientProxyRMQ.getClientProxyAdminBackendInstance();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAllPlayers(@Req() req: Request): Observable<any> {
    return this.clientAdmin.send('find-players', '');
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('/:id')
  findPlayerById(@Param('id') id: PlayerId): Observable<any> {
    return this.clientAdmin.send('find-players', { id });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() data: PlayerDTO) {
    await this.clientAdmin.send('find-categories', data.category).toPromise();
    this.clientAdmin.emit('create-player', data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayerById(
    @Body() data: PlayerDTO,
    @Param('id', IdValidationPipe) id: PlayerId,
  ) {
    this.clientAdmin.emit('update-player', { player: data, id });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete('/:id')
  async deletePlayerById(@Param('id', IdValidationPipe) id: PlayerId) {
    this.clientAdmin.emit('delete-player', { id });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('/:id/uploadProfilePhoto')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadProfilePhoto(@UploadedFile() file, @Param('id') id: PlayerId) {
    await this.clientAdmin.send('find-players', id).toPromise();

    const url = await this.fileService.uploadFile(id, file);

    await this.clientAdmin
      .emit('upload-profile-photo', { id, url })
      .toPromise();

    return this.clientAdmin.send('find-players', id);
  }
}
