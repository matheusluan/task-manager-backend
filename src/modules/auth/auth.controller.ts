import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto } from 'src/shared/dtos/login.dto';
import { RegisterDto } from 'src/shared/dtos/register.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @Public()
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Public()
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
