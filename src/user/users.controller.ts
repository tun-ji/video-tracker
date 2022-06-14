import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponseInterface } from './types/UserResponseInterface.types';
import { User } from './entities/user.entity';
import { loginDto } from './dto/login-user.dto';
import { UserDec } from './decorators/user.decorator';
import { AuthGuard } from '@app/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  async currentUser(@UserDec() user: User): Promise<userResponseInterface> {
    return this.usersService.userResponseFormatter(user)
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginDto: loginDto): Promise<userResponseInterface> {
    const user = await this.usersService.login(loginDto)
    return this.usersService.userResponseFormatter(user)
  }
  
  @Put()
  @UseGuards(AuthGuard)
  async updateUser(@UserDec('id') user_id: number, @Body('user') updateUserDto: UpdateUserDto): Promise<userResponseInterface> {
    const user = await this.usersService.update(user_id, updateUserDto)
    return this.usersService.userResponseFormatter(user)
  }
}
