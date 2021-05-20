import { Inject, Logger } from '@nestjs/common';
import { NotificationRepository } from 'src/domain/notifications/notification.repository';
import { ConfigService } from 'src/infrastructure/config/config.service';

export class AWSNotificationRepository implements NotificationRepository {

  private logger = new Logger(AWSNotificationRepository.name);

  constructor(
    @Inject("AWS-SES-MAIL")
    private readonly awsMailProvider : any,
    private readonly configService : ConfigService
  ) {}

  async sendMail(to: string, subject : string, message: string): Promise<void> {

    try{

      const emailParams = {
        Content: {
            Simple: {
                Body: {
                    Html: { Data: message, Charset: 'UTF-8' }//ISO-8859-1
                },
                Subject: { Data: subject, Charset: 'UTF-8' }//ISO-8859-1
            }
        },
        Destination: { ToAddresses: [to] },
        FromEmailAddress: this.configService.get('AWS_SES_SENDER'),
  
    }
  
      await this.awsMailProvider.sendEmail(emailParams).promise();

      this.logger.log('Notification e-mail sended successfull!')

    }catch(err){
      this.logger.error(err.message)
    }
   
  }

}
