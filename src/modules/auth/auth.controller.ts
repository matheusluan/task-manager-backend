import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from 'src/shared/dtos/login.dto';
import { RegisterDto } from 'src/shared/dtos/register.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('register')
    async register(
        @Body() dto: RegisterDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const token = await this.authService.register(dto);

        response.cookie('jwt', token, {
            httpOnly: true,
        });

        return { message: 'success' };
    }

    @Public()
    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const token = await this.authService.login(dto);

        response.cookie('jwt', token, {
            httpOnly: true,
        });

        return { message: 'success' };
    }
}
