import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    @MinLength(3)
    email:string;
    
    @IsString()
    @MinLength(3)
    password:string;
    
    @IsOptional()
    name?:string;
}