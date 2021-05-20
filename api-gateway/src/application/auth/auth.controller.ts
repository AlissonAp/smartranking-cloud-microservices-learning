import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthUserLoginDTO } from "./auth-user-login.dto";
import { AuthUserRegisterDTO } from "./auth-user-register.dto";
import { AuthService } from "./auth.service";

@Controller('v1/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authUserRegister: AuthUserRegisterDTO){
    return await this.authService.register(authUserRegister);
  }

  @Post('login')
  async authenticate(@Body() authUserLogin: AuthUserLoginDTO){
    return await this.authService.authenticate(authUserLogin);
  }
}