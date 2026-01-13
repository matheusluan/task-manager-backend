import { Controller, Get, UseGuards } from "@nestjs/common";

import { UserService } from "./user.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
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

    @Get('count')
    countUsers() {
        return this.userService.countUsers();
    }
}
