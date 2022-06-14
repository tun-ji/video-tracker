import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponseInterface } from './types/UserResponseInterface.types';
import { User } from './entities/user.entity';
import { loginDto } from './dto/login-user.dto';
import { Request } from 'express';
import { ExpressRequest } from '@app/types/expressRequest.interface';

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

  @Get()
  async currentUser(@Req() request: ExpressRequest): Promise<userResponseInterface> {
    return this.usersService.userResponseFormatter(request.user)
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginDto: loginDto): Promise<userResponseInterface> {
    const user = await this.usersService.login(loginDto)
    return this.usersService.userResponseFormatter(user)
  } 
}
