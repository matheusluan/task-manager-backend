import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { TaskService } from "./task.service";
import { CreateTaskDto, UpdateTaskDto } from "src/shared/dtos/task.dto";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    create(
        @Body() dto: CreateTaskDto,
        @CurrentUser() user: { id: string },
    ) {
        return this.taskService.create(dto, user.id);
    }

    @Get()
    findAll(
        @Query() query: any,
        @CurrentUser() user: { id: string },
    ) {
        return this.taskService.findAll(query, user.id);
    }

    @Get(':id')
    findById(
        @Param('id') id: string,
        @CurrentUser() user: { id: string },
    ) {
        return this.taskService.findById(id, user.id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateTaskDto,
        @CurrentUser() user: { id: string },
    ) {
        return this.taskService.update(id, dto, user.id);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
        @CurrentUser() user: { id: string },
    ) {
        return this.taskService.delete(id, user.id);
    }

}
