import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BadRequest } from '../Utill/responseService';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  findAll() {
    try {
      return this.UserRepository.find();
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number): Promise<User> {
    const existingUser = await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });
    if (existingUser == null) {
      throw BadRequest('No user with such id');
    } else {
      return existingUser;
    }
  }
}
