import { Body, Controller, Delete, Get, Put, Res, UseGuards } from "@nestjs/common";

import type { Response } from 'express';
import { UserService } from "./user.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { UpdateUserDto } from "src/shared/dtos/user.dto";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get('me')
    getMe(@CurrentUser() user) {
        console.log("user", user)
        return user;
    }

    @UseGuards(AuthGuard)
    @Put()
    update(@CurrentUser() user, @Body() dto: UpdateUserDto) {
        return this.userService.update({ id: user.id, dto });
    }

    @UseGuards(AuthGuard)
    @Delete()
    async deleteAccount(
        @CurrentUser() user,
        @Res({ passthrough: true }) res: Response,
    ) {

        await this.userService.delete({ id: user.id });

        res.clearCookie('auth', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });

        return { message: 'User deleted successfully' };
    }

    @Get('count')
    countUsers() {
        return this.userService.countUsers();
    }
}
