import { Injectable } from "@nestjs/common";
import { Prisma, Task } from "generated/prisma/client";
import { PrismaService } from "src/databases/prisma/prisma.service";

@Injectable()
export class TaskRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({ data });
    }

    async findById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    async findAll(params: {
        where: Prisma.TaskWhereInput;
        skip?: number;
        take?: number;
    }): Promise<Task[]> {
        const { where, skip, take } = params;

        return this.prisma.task.findMany({
            where,
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async update(
        id: string,
        data: Prisma.TaskUpdateInput,
    ): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.task.delete({
            where: { id },
        });
    }

    async count(where: Prisma.TaskWhereInput): Promise<number> {
        return this.prisma.task.count({ where });
    }
}
