import { AuthUserLoginDTO } from "src/application/auth/auth-user-login.dto";
import { AuthUserRegisterDTO } from "src/application/auth/auth-user-register.dto";

export interface AuthRepository {
    register(data: AuthUserRegisterDTO)
    authenticate(data: AuthUserLoginDTO) : Promise<any>;
}