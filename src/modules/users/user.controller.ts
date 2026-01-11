import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";

@Controller('users')
export class UserController {

    @Get('me')
    getMe(@CurrentUser() user) {
        return user;
    }
}
