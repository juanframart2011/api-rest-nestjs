import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';

export interface RequestWithUser extends Request{
    user:{
        email:string;
        role:string
    }
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){}

    @Post()
    login(
        @Body() loginDto:LoginDto
    ){
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    @Roles('admin')
    profile(
        @Req() req: RequestWithUser,
    ){

        return this.authService.profile({
            email: req.user.email,
            role: req.user.role
        })
    }

    @Post('register')
    register(
        @Body() registerDto:RegisterDto
    ){
        return this.authService.register(registerDto);
    }
}
