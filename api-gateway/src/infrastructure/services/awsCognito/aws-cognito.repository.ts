import { Inject, Logger } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import { AuthUserLoginDTO } from 'src/application/auth/auth-user-login.dto';
import { AuthUserRegisterDTO } from 'src/application/auth/auth-user-register.dto';
import { AuthRepository } from 'src/domain/common/auth.repository';
import { ConfigService } from 'src/infrastructure/config/config.service';

export class AWSAuthRepository implements AuthRepository {
  private logger = new Logger(AWSAuthRepository.name);

  constructor(
    @Inject('AWS-COGNITO-AUTH-PROVIDER')
    private readonly awsAuthProvider: CognitoUserPool,
    private readonly configService: ConfigService,
  ) {}

  register(data: AuthUserRegisterDTO) {
    return new Promise((resolve, reject) => {
      this.awsAuthProvider.signUp(
        data.email,
        data.password,
        [
          new CognitoUserAttribute({
            Name: 'phone_number',
            Value: `+55${data.phoneNumber}`,
          }),
          new CognitoUserAttribute({
            Name: 'name',
            Value: data.name,
          }),
          
        ],
        null,
        (err, result) => {
          if (err) {
            this.logger.error(err)
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  authenticate(data: AuthUserLoginDTO): Promise<any>{
    const cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: this.awsAuthProvider,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: data.email,
      Password: data.password,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
