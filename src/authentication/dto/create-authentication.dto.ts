import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthenticationDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phoneNo: string

    @IsNotEmpty()
    street: string

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
