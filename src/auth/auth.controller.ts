import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

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
    profile(
        @Request() req,
    ){
        return req.user;
    }

    @Post('register')
    register(
        @Body() registerDto:RegisterDto
    ){
        return this.authService.register(registerDto);
    }
}
