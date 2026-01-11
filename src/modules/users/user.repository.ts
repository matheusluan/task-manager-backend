import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../databases/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma/client';


@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    // CREATE
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    // READ - by id
    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    // READ - by email (auth)
    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    // READ - list (pagination ready)
    async findAll(params?: {
        skip?: number;
        take?: number;
        search?: string;
    }): Promise<User[]> {
        const { skip, take, search } = params || {};

        return this.prisma.user.findMany({
            skip,
            take,
            where: search
                ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                    ],
                }
                : undefined,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    // UPDATE
    async update(
        id: string,
        data: Prisma.UserUpdateInput,
    ): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    // DELETE
    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }
}
