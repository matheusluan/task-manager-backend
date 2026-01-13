import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @MinLength(6)
    @IsString()
    @IsOptional()
    password: string;
}
