import { Controller, Get, UseGuards } from "@nestjs/common";

import { TaskService } from "./task.service";

@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    /*  @UseGuards(AuthGuard)
     @Get('me')
     getMe(@CurrentUser() user) {
         console.log("user", user)
         return user;
     }
  */

    //Count all tasks
    @Get('count')
    countTasks() {
        return this.taskService.count();
    }
}
