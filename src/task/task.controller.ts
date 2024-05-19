import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './CreateTaskDto';
import { User } from 'src/users/user.entity';

@Controller('tasks')
export class TaskController {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskRepository.findOneOrFail({ where: { id } });
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const task = await this.taskRepository.findOneOrFail({ where: { id } });
    this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
