import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService:UsersService
    ){}

    async login(){

        return await 'service login';
    }

    async register(registerDto:RegisterDto){
        return await this.userService.create(registerDto);
    }
}