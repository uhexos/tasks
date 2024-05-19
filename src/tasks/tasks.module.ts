import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Task } from './entities/task.entity';
import { UsersService } from 'src/users/users.service';
import { TaskGateway } from 'src/tasks/task.gateway';

@Module({
  controllers: [TasksController],
  providers: [TasksService, UsersService, TaskGateway],
  imports: [TypeOrmModule.forFeature([User, Task])],
})
export class TasksModule {}
