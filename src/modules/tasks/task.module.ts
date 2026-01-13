import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { UserModule } from '../users/user.module';

@Module({
    imports: [UserModule],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
    exports: [TaskRepository],
})
export class TaskModule { }
