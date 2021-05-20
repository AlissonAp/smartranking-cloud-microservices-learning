import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from 'src/infrastructure/config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: configService.get('AWS_COGNITO_CLIENT_ID'),
      issuer: configService.get('AWS_COGNITO_AUTHORITY_ENDPOINT'),
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get(
          'AWS_COGNITO_AUTHORITY_ENDPOINT',
        )}/.well-known/jwks.json`,
      }),
    });
  }

  public async validate(payload: any) {
    return {
      user_id: payload.sub,
      email: payload.email,
    };
  }
}
