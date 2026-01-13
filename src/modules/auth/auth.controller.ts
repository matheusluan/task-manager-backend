import { Controller, Post, Body, Res, UseGuards, Get } from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from 'src/shared/dtos/login.dto';
import { RegisterDto } from 'src/shared/dtos/register.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(
        @Body() dto: RegisterDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.authService.register(dto, response);
    }

    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.authService.login(dto, response);
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('auth');
        return { message: 'Logged out' };
    }

    @UseGuards(AuthGuard)
    @Get("validate")
    validateToken(@CurrentUser() user) {
        return { message: user ? 'success' : 'error' }
    }

}
