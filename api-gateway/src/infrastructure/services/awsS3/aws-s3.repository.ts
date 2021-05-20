import { Inject, Logger } from '@nestjs/common';
import { FileRepository } from 'src/domain/common/file.repository';
import { ConfigService } from 'src/infrastructure/config/config.service';

export class AWSFileRepository implements FileRepository {

  private logger = new Logger(AWSFileRepository.name);

  constructor(
    @Inject("AWS-S3-FILE-STORAGE")
    private readonly awsFileProvider : any,
    private readonly configService : ConfigService
  ) {}

  async uploadFile(id: string, file: any): Promise<string> {

    const fileExtension = file.originalname.split('.')[file.originalname.split.length - 1];
    const urlKey = `${id}.${fileExtension}`;

    const data = await this.awsFileProvider.putObject({
      Body: file.buffer,
      Bucket: this.configService.get('AWS_BUCKET_NAME'), 
      Key : urlKey
    }).promise();

    return `https://${this.configService.get('AWS_BUCKET_NAME')}.s3-${this.awsFileProvider.config.region}.amazonaws.com/${urlKey}`

  }
}
