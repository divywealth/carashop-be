import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>
  ){}

  findAll() {
    try{
      return this.UserRepository.find()
    }catch(e) {
      throw(e.message)
    }
  }

  findOne(id: number): Promise<User> {
    try{
      const existingUser = this.UserRepository.findOne({
        where: {
          id:id
        }
      })
      if(existingUser != null) {
        return existingUser
      }else {
        throw new HttpException("user not found", HttpStatus.BAD_REQUEST)
      }
    }catch(e) {
      throw(e.message)
    }
  }
}
