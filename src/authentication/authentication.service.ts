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
  
  async create(createAuthenticationDto: CreateAuthenticationDto) {
    try {
      const existingUser = await this.UserRepository.findOne({
        where: {
          phoneNo: createAuthenticationDto.phoneNo,
          email: createAuthenticationDto.email
        }
      })
      if(existingUser != null) {
        throw new HttpException("User already exist", HttpStatus.BAD_REQUEST) 
      }else{
       return this.UserRepository.save(createAuthenticationDto)
      }
    }catch(e) {
      throw(e.message)
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
        throw new HttpException("phoneNo dosen't have an account", HttpStatus.BAD_REQUEST)
        
      }else if(!await bcrypt.compare(loginUserDto.password, existingUser.password)){
        throw new HttpException("password is not correct", HttpStatus.BAD_REQUEST)
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
    return `This action updates a #${id} authentication`;
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
