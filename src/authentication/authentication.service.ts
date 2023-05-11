import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
    private jwtService: JwtService
  ){}
  
  async create(createAuthenticationDto: CreateAuthenticationDto) :Promise<User> {
    try {
      const existingUser = await this.UserRepository.findOne({
        where: {
          phoneNo: createAuthenticationDto.phoneNo,
        }
      })
      if(existingUser != null) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: "User already exist"
        }, HttpStatus.BAD_REQUEST)
      }else{
       return this.UserRepository.save(createAuthenticationDto)
      }
    }catch(e) {
      throw new HttpException({
        error: e.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      if ((!loginUserDto.phoneNo) || !loginUserDto.password) {
        return  'email and password required'
      }
      const existingUser = await this.UserRepository.findOne({
        where: {
          phoneNo: loginUserDto.phoneNo,
        }
      })
      if(existingUser == null ) {
        throw new HttpException("PhoneNo dosen't have an account try creating an account instead", HttpStatus.BAD_REQUEST)
      }else if(!await bcrypt.compare(loginUserDto.password, existingUser.password)){
        throw new HttpException("Incorrect Password ", HttpStatus.BAD_REQUEST)
      }else {
        const payload = {
          userId: existingUser.id,
          phoneNo: existingUser.email
        }
        return {
          user: existingUser,
          access_token: this.jwtService.sign({user: existingUser}),
        };
      }
      
    }catch(e) {
      throw(e.message)
    }
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    try {
      const existingUser = this.UserRepository.findOne({
        where: {
          id:id
        }
      })
      if(existingUser != null) {
        return this.UserRepository.update({id}, {...updateAuthenticationDto})
      }else {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
      }
    }catch(e) {
      throw(e.message)
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.UserRepository.findOne({
        where: {
          id:id
        }
      })
      if(existingUser != null) {
        return this.UserRepository.delete({id})
      }else {
        throw new HttpException("User wasn't found", HttpStatus.BAD_REQUEST)
      }
    }catch(e) {
      throw(e.message)
    }
  }
}
