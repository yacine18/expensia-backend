import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}
