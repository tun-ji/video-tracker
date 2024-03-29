import { IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDto {
    readonly firstName: string

    @IsNotEmpty() 
    @IsEmail()
    readonly email: string

    readonly lastName: string

    @IsNotEmpty()
    readonly username: string

    @IsNotEmpty()
    readonly password: string
}
