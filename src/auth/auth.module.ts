import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
