import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, IsNumberString, IsIn } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TaskPriority, TaskStatus } from 'generated/prisma/enums';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsEnum(TaskPriority)
    @IsOptional()
    priority?: TaskPriority;

    @IsDateString()
    @IsOptional()
    dueDate?: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) { }


export class FindTasksDto {
    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;

    @IsOptional()
    @IsIn(["priority", "createdAt"])
    order?: "priority" | "createdAt";
}