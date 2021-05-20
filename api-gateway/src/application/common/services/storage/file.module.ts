import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { AWSS3Module } from 'src/infrastructure/services/awsS3/aws-s3.module';
import { AWSFileRepository } from 'src/infrastructure/services/awsS3/aws-s3.repository';
import { FileService } from './file.service';

@Module({
  imports: [ConfigModule, AWSS3Module],
  controllers: [],
  providers: [
   FileService,
   AWSFileRepository,
  ],
  exports: [FileService],
})
export class FileModule {}
