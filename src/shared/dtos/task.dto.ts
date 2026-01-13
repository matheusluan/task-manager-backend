import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
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
