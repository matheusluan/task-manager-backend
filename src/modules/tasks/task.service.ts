import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { CreateTaskDto, FindTasksDto, UpdateTaskDto } from "src/shared/dtos/task.dto";

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

    async findAll(query: FindTasksDto, userId: string) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        const where = { userId };

        const [tasks, total] = await Promise.all([
            this.taskRepo.findAll({
                where,
                skip,
                take: limit,
            }),
            this.taskRepo.count(where),
        ]);

        return {
            data: tasks,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: string, userId: string) {
        const task = await this.taskRepo.findById(id);

        if (!task) {
            throw new NotFoundException();
        }

        if (task.userId !== userId) {
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
