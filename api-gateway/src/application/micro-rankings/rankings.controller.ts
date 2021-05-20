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
  UseGuards,
} from '@nestjs/common';
import { IdValidationPipe } from '../common/pipes/id.validation';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyRMQProvider } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.provider';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/rankings')
@ApiTags('Rankings')
export class RankingController {
  private clientRanking: ClientProxy;

  constructor(private readonly clientProxyRMQ: ProxyRMQProvider) {
    this.clientRanking = this.clientProxyRMQ.getClientProxyRankingsBackendInstance();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('/:categoryId/:dateRef')
  async findRankings(
    @Param('categoryId', IdValidationPipe) categoryId: string,
    @Param('dateRef') dateRef: string,
  ) {
    return this.clientRanking.send('find-rankings', { categoryId , dateRef }).toPromise();
  }

}
