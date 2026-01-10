import { Module } from '@nestjs/common';
import { PrismaService } from './databases/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
