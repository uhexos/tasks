import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tasks',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    TypeOrmModule.forFeature([Task, User]),
  ],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
