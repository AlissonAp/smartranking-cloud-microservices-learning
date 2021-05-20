import { ClientProxy } from '@nestjs/microservices';
import { IChallenge, IPlayer } from 'src/domain/common/general.types';
import { NotificationRepository } from '../notification.repository';
import ChallengeNotificationTemplate from '../static/new-challenge-notification.template';

export class NewChallengeNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly clientAdmin: ClientProxy,
    private readonly clientChallenge: ClientProxy,
  ) {}

  async execute(challengeId: string): Promise<void> {
    const challenge: IChallenge = await this.clientChallenge
      .send('find-challenges', { challengeId })
      .toPromise();

    const requesterPlayer: IPlayer = await this.clientAdmin
      .send('find-players', challenge.requester)
      .toPromise();

    const requestedPlayer: IPlayer = await this.clientAdmin
      .send(
        'find-players',
        challenge.players.filter((player) => player !== requesterPlayer.id)[0],
      )
      .toPromise();

    let newChallengeNotificationTemplate = ChallengeNotificationTemplate;

    newChallengeNotificationTemplate = newChallengeNotificationTemplate.replace(
      '@requesterPlayer',
      requesterPlayer.name,
    );
    newChallengeNotificationTemplate = newChallengeNotificationTemplate.replace(
      '@requestedPlayer',
      requestedPlayer.name,
    );
    newChallengeNotificationTemplate = newChallengeNotificationTemplate.replace(
      '@realizationDate',
      challenge.realizationDate,
    );

    this.notificationRepository.sendMail(
      requestedPlayer.email,
      `Parece que alguém lhe desafiou!`,
      newChallengeNotificationTemplate,
    );
  }
}
