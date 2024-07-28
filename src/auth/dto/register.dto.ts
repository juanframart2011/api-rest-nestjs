import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/common/enum/rol.enum";

export class RegisterDto{
    @IsEmail()
    @MinLength(3)
    email:string;
    
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password:string;
    
    @Transform(({value})=> value.trim())
    @IsOptional()
    name?:string;

    @Transform(({value})=> value.trim())
    @IsOptional()
    role?:Role;
}