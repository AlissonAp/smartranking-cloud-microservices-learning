import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { AWSFileProvider } from './aws-s3.provider';

@Module({
  imports: [ConfigModule],
  providers: [...AWSFileProvider],
  exports: [...AWSFileProvider],
})
export class AWSS3Module {}
