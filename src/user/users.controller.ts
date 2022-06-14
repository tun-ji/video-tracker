import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponseInterface } from './types/UserResponseInterface.types';
import { User } from './entities/user.entity';
import { loginDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') 
    createUserDto: CreateUserDto): Promise<userResponseInterface> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.userResponseFormatter(user)
  }

  @Post('/login')
  async login(@Body('user') loginDto: loginDto): Promise<userResponseInterface> {
    const user = await this.usersService.login(loginDto)
    return this.usersService.userResponseFormatter(user)
  }
}
