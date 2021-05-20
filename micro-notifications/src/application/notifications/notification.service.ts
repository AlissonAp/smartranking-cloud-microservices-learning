import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyRMQProvider } from 'src/infrastructure/services/proxyRMQ/proxy-rmq.provider';
import { NewChallengeNotificationUseCase } from 'src/domain/notifications/usecases/new-challenge-notification';
import { AWSNotificationRepository } from 'src/infrastructure/services/awsSES/aws-ses.repository';

@Injectable()
export class NotificationService {
  private clientAdmin: ClientProxy;
  private clientChallenges: ClientProxy;

  constructor(
    private readonly notificationRepository: AWSNotificationRepository,
    private readonly clientProxyRMQ: ProxyRMQProvider
  ) {
    this.clientAdmin = this.clientProxyRMQ.getClientProxyAdminBackendInstance();
    this.clientChallenges = this.clientProxyRMQ.getClientProxyChallengesBackendInstance()
  }

  challengeNotification(challengeId: string): Promise<void> {

    const newChallengeUseCase = new NewChallengeNotificationUseCase(
      this.notificationRepository,
      this.clientAdmin,
      this.clientChallenges
    );

    return newChallengeUseCase.execute(challengeId);
  }

}
