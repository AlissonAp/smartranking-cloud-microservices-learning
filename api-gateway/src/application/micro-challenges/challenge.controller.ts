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
import {
  ChallengeId,
  IChallenge,
  Status,
} from 'src/domain/micro-challenges/general.types';
import {
  ChallengeCreateDTO,
  ChallengeUpdateDTO,
  MatchCreateDTO,
} from './challenge.dto';
import { IdValidationPipe } from '../common/pipes/id.validation';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyRMQProvider } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.provider';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EntityIncorrectData } from '../../domain/common/business.exception';
import { PlayerId } from 'src/domain/micro-admin-backend/general.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/challenges')
@ApiTags('Challenges')
export class ChallengeController {
  private clientChallenge: ClientProxy;
  private clientAdmin: ClientProxy;

  constructor(private readonly clientProxyRMQ: ProxyRMQProvider) {
    this.clientChallenge = this.clientProxyRMQ.getClientProxyChallengesBackendInstance();
    this.clientAdmin = this.clientProxyRMQ.getClientProxyAdminBackendInstance();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAllChallenges(): Observable<any> {
    return this.clientChallenge.send('find-challenges', {
      challengeId: '',
      playerId: '',
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('/:challengeId')
  findChallengeById(
    @Param('id', IdValidationPipe) challengeId: ChallengeId,
  ): Observable<any> {
    return this.clientChallenge.send('find-challenges', {
      challengeId: challengeId,
      playerId: '',
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('/:playerId')
  findChallengeByPlayer(
    @Param('id', IdValidationPipe) playerId: PlayerId,
  ): Observable<any> {
    return this.clientChallenge.send('find-challenges', {
      challengeId: '',
      playerId: playerId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('/:categoryId/:status')
  findChallengeByCategoryAndStatus(
    @Param('id', IdValidationPipe) categoryId: string,
    @Param('status', IdValidationPipe) status: Status,
  ): Observable<any> {
    return this.clientChallenge.send('find-challenges', {
      challengeId: '',
      playerId: '',
      categoryId: categoryId,
      status,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() data: ChallengeCreateDTO) {
    const checkValidPlayersPromise = data.players.map((playerId) => {
      return this.clientAdmin.send('find-players', playerId).toPromise();
    });

    const validPlayers = await Promise.all(checkValidPlayersPromise);

    if (validPlayers.some((player) => player.category !== data.category)) {
      throw new EntityIncorrectData('Challenge', [
        `The players of the challenge are not in the same category!`,
      ]);
    }

    if (!validPlayers.some((player) => player.id === data.requester)) {
      throw new EntityIncorrectData('Challenge', [
        `The requester player must be a player of the challenge!`,
      ]);
    }

    this.clientChallenge.emit('create-challenge', data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateChallengeById(
    @Body() data: ChallengeUpdateDTO,
    @Param('id', IdValidationPipe) id: ChallengeId,
  ) {
    const challenge: IChallenge = await this.clientChallenge
      .send('find-challenges', { challengeId: id })
      .toPromise();

    if (challenge.status !== Status.PENDING) {
      throw new EntityIncorrectData('Challenge', [
        `The challenge must be have a PENDING status for update!`,
      ]);
    }

    this.clientChallenge.emit('update-challenge', { challenge: data, id });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete('/:id')
  async deleteChallengeById(@Param('id', IdValidationPipe) id: ChallengeId) {
    await this.clientChallenge
      .send('find-challenges', { challengeId: id })
      .toPromise();

    this.clientChallenge.emit('delete-challenge', { id });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('/:id/match')
  @UsePipes(ValidationPipe)
  async assignMatchToChallenge(
    @Body() data: MatchCreateDTO,
    @Param('id', IdValidationPipe) id: ChallengeId,
  ) {
    const challenge: IChallenge = await this.clientChallenge
      .send('find-challenges', { challengeId: id })
      .toPromise();

    if (challenge.status === Status.FINISHED) {
      throw new EntityIncorrectData('Challenge', [
        `The challenge is already finished!`,
      ]);
    }

    if (challenge.status !== Status.ACCEPTED) {
      throw new EntityIncorrectData('Challenge', [
        `The challenge has not yet been accepted!`,
      ]);
    }

    if (!challenge.players.includes(data.def)) {
      throw new EntityIncorrectData('Challenge', [
        `The winner player must be a part of challenge!`,
      ]);
    }

    this.clientChallenge.emit('assign-match-to-challenge', { match: data, id });
  }
}
