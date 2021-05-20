import { Injectable } from "@nestjs/common";
import { AWSFileRepository } from "src/infrastructure/services/awsS3/aws-s3.repository";

@Injectable()
export class FileService {
  constructor(private readonly playerFileRepository: AWSFileRepository) {}

  uploadFile(id: string, file: any): Promise<string> {
    return this.playerFileRepository.uploadFile(id, file);
  }
}