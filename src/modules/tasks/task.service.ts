import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, FindTasksDto, UpdateTaskDto } from "src/shared/dtos/task.dto";
import { Prisma } from "generated/prisma/client";
import { TaskRepository } from "./task.repository";

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

        const where: Prisma.TaskWhereInput = {
            userId,
            ...(query.title ? { title: { contains: query.title, mode: "insensitive" } } : {}),
            ...(query.priority ? { priority: query.priority } : {}),
            ...(query.status ? { status: query.status } : {}),
        };

        let orderBy: Prisma.TaskOrderByWithRelationInput = { createdAt: "desc" };
        if (query.order === "dueDate") {
            orderBy = { dueDate: "asc" };
        } else if (query.order === "createdAt") {
            orderBy = { createdAt: "desc" };
        }

        const [tasks, total] = await Promise.all([
            this.taskRepo.findAll({ where, skip, take: limit, orderBy }),
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
