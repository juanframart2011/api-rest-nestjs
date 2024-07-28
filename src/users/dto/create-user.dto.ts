import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/common/enum/rol.enum";

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

    @IsOptional()
    role:Role;
}