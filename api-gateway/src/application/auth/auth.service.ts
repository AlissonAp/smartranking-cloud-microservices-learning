import { Injectable } from '@nestjs/common';
import { AWSAuthRepository } from 'src/infrastructure/services/awsCognito/aws-cognito.repository';
import { AuthUserLoginDTO } from './auth-user-login.dto';
import { AuthUserRegisterDTO } from './auth-user-register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AWSAuthRepository) {}

  async register(data: AuthUserRegisterDTO) {
    await this.authRepository.register(data);
  }
  async authenticate(data: AuthUserLoginDTO) {
    return await this.authRepository.authenticate(data);
  }
}
