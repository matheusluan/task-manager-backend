import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, UpdateTaskDto } from "src/shared/dtos/task.dto";
import { TaskRepository } from "./task-repository";

@Injectable()
export class TaskService {
    constructor(private readonly taskRepo: TaskRepository) { }

    async create(dto: CreateTaskDto, userId: string) {
        return this.taskRepo.create({
            title: dto.title,
            status: dto.status,
            priority: dto.priority,
            description: dto.description,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            user: {
                connect: { id: userId },
            },

        });
    }

    async findAll(query: any, userId: string) {
        return this.taskRepo.findAll({
            ...query,
            userId,
        });
    }

    async findById(id: string, userId: string) {
        const task = await this.taskRepo.findById(id);
        if (!task) throw new NotFoundException();

        const hasAccess = await this.taskRepo.findAll({ userId });
        if (!hasAccess.find(t => t.id === id)) {
            throw new ForbiddenException();
        }

        return task;
    }

    async update(id: string, dto: UpdateTaskDto, userId: string) {
        await this.findById(id, userId);
        return this.taskRepo.update(id, {
            ...dto,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        });
    }

    async delete(id: string, userId: string) {
        await this.findById(id, userId);
        return this.taskRepo.delete(id);
    }


}
