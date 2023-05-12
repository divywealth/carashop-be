import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>
  ){}

  findAll() {
    return this.UserRepository.find()
  }

  async findOne(id: number): Promise<User> {
      const existingUser = await this.UserRepository.findOne({
        where: {
          id:id
        }
      })
      if(existingUser == null) {
        throw new HttpException("No user with such id", HttpStatus.BAD_REQUEST)
      }else {
        return existingUser
      }
  }
}
