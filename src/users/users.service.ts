import { MikroORM } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly orm: MikroORM) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.orm.em.findOneOrFail(User, { email: email });
  }
}
