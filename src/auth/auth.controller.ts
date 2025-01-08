import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enum/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
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

    @ApiBearerAuth()
    @Get('profile')
    @Auth(Role.ADMIN)
    profile(
        @ActiveUser() user: userActiveInterface
    ){

        return this.authService.profile(user);
    }

    @Post('register')
    register(
        @Body() registerDto:RegisterDto
    ){
        return this.authService.register(registerDto);
    }
}
