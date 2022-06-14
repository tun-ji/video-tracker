import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { userResponseInterface } from './types/UserResponseInterface.types';
import { loginDto } from './dto/login-user.dto';
import { compare } from 'bcrypt'


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email
    })

    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username
    })
    
    if (userByEmail || userByUsername ) {
      throw new HttpException('Email or username is taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const newUser = new User()
    Object.assign(newUser, createUserDto)
    return await this.userRepository.save(newUser)
  }

  generateJwt(user: User): string {
    return sign({
      id: user.user_id,
      username: user.username,
      email: user.email,
    }, JWT_SECRET, )
  }

  userResponseFormatter(user: User): userResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      }
    }
  }

  async login(loginUser: loginDto): Promise<User> {
    const user = await this.userRepository.findOne({
      email: loginUser.email,
    }, 
    {select: ['user_id', 'email', 'firstName', 'firstName', 'password', 'username', 'videos'] }, 
    )

    if (!user) {
      throw new HttpException('Please create an account', HttpStatus.UNPROCESSABLE_ENTITY)
    } 

    const isPasswordCorrect = compare(loginUser.password, user.password)

    if (isPasswordCorrect) {
      delete user.password
      return user
    } else {
      throw new HttpException('Incorrect Password', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  // if the email is in the repository, check if the password is correct. If it's not, return user.
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id)
  }
}
