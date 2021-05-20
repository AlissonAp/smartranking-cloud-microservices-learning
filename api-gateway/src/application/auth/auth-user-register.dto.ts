import { IsEmail, IsMobilePhone, IsString, Matches } from "class-validator";

export class AuthUserRegisterDTO {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { message : 'Senha inválida. A senha deve possuir caracteres maiúsculos, minúsculos e ao menos 1 número.'})
    password: string;
    @IsMobilePhone('pt-BR')
    phoneNumber: string;
}