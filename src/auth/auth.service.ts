import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService:UsersService,
        private readonly jwtService:JwtService
    ){}

    async login(loginDto:LoginDto){

        const user = await this.userService.findByEmailWithPassword(loginDto.email);
        if( !user ){

            throw new UnauthorizedException('el usuario no existe');
        }
        
        const isPasswordValid = await bcryptjs.compare(loginDto.password,user.password);

        if(!isPasswordValid){

            throw new UnauthorizedException('errores de login');
        }

        const payload = { sub: user.id, username: user.email };
        return {
            
            access_token: await this.jwtService.signAsync(payload),
            email: user.email,
            role: user.role
        };
    }

    async profile({email,role}:{email:string,role:string}){

        /*if( role !== 'admin' ){
            
            throw new UnauthorizedException('Not permited');
        }*/

        return await this.userService.findOneByEmail(email);
    }

    async register({name, email, password, role}:RegisterDto){

        const user = await this.userService.findOneByEmail(email);
        if( user ){

            throw new BadRequestException('el usuario ya existe');
        }

        return await this.userService.create({
            name,
            email,
            role,
            password: await bcryptjs.hash(password,10)
        });
    }
}