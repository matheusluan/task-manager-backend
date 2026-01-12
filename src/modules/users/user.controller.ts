import { Controller, Get } from "@nestjs/common";

import { UserService } from "./user.service";
import { Public } from 'src/shared/decorators/public.decorator';
import { CurrentUser } from "src/shared/decorators/current-user.decorator";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('me')
    getMe(@CurrentUser() user) {
        return user;
    }

    @Public()
    @Get('count')
    countUsers() {
        return this.userService.countUsers();
    }
}
