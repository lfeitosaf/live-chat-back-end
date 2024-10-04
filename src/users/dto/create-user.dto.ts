import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { hashSync } from "bcryptjs"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({value}: {value: string}) => hashSync(value, 10), {
        groups: ['transform']
    })
    password: string;

    @IsString()
    avatar: string
}
