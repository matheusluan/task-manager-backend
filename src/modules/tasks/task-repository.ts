import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../databases/prisma/prisma.service';
import { Prisma, Task, TaskStatus, TaskPriority } from 'generated/prisma/client';

@Injectable()
export class TaskRepository {
    constructor(private readonly prisma: PrismaService) { }

    // CREATE
    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data,
        });
    }

    // READ - by id
    async findById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    // READ - list with filters + pagination
    async findAll(params?: {
        skip?: number;
        take?: number;
        status?: TaskStatus;
        priority?: TaskPriority;
        search?: string;
        userId?: string;
    }): Promise<Task[]> {
        const { skip, take, status, priority, search, userId } = params || {};

        return this.prisma.task.findMany({
            skip,
            take,
            where: {
                ...(status && { status }),
                ...(priority && { priority }),
                ...(search && {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } },
                    ],
                }),
                ...(userId && {
                    users: {
                        some: {
                            userId,
                        },
                    },
                }),
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // UPDATE
    async update(
        id: string,
        data: Prisma.TaskUpdateInput,
    ): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }

    // DELETE
    async delete(id: string): Promise<void> {
        await this.prisma.task.delete({
            where: { id },
        });
    }

    // COUNT
    async count(): Promise<number> {
        return this.prisma.task.count();
    }


}
