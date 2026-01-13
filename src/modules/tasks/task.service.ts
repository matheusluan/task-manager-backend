import { Injectable } from "@nestjs/common";
import { TaskRepository } from "./task-repository";

@Injectable()
export class TaskService {
    constructor(private readonly taskRepo: TaskRepository) { }

    async count() {
        return this.taskRepo.count();
    }
}
