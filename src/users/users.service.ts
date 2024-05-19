import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class RegisterUserDto {
  email: string;
  password: string;
  fullName: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async create(createUserDto: RegisterUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }
}
