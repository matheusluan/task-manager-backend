import { Module } from '@nestjs/common';
import { PrismaModule } from './databases/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule { }
