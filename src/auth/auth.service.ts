import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  UsersService,
  RegisterUserDto as RegisterUserDto,
  LoginUserDto,
} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(registerUserDto: RegisterUserDto): Promise<any> {
    const existingUser = await this.usersService.findByEmail(
      registerUserDto.email,
    );
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const userDetails = new RegisterUserDto();
    userDetails.email = registerUserDto.email;
    userDetails.fullName = registerUserDto.fullName;
    userDetails.password = hashedPassword;

    const newUser = await this.usersService.create(userDetails);

    const { password: _, ...result } = newUser;
    return result;
  }
}
