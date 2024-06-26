import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/users/user.entity';
import { TaskGateway } from 'src/tasks/task.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskGateway: TaskGateway,
  ) {}

  async create(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    task.user = user;

    const savedTask = await this.taskRepository.save(task);
    this.taskGateway.server.emit('taskCreated', savedTask);

    return savedTask;
  }

  async findAll(user: User): Promise<Task[]> {
    return this.taskRepository.find({ where: { user: user } });
  }

  async findOne(user: User, id: number): Promise<Task | null> {
    return this.taskRepository.findOne({ where: { id: id, user: user } });
  }

  async update(
    user: User,
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    const task = await this.findOne(user, id);
    if (!task) {
      return null;
    }
    task.completed = updateTaskDto.completed;
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    const savedTask = await this.taskRepository.save(task);
    this.taskGateway.server.emit('taskUpdated', savedTask);

    return savedTask;
  }

  async remove(user: User, id: number): Promise<void> {
    const task = await this.findOne(user, id);
    if (task) {
      await this.taskRepository.remove(task);
    }
  }
}
