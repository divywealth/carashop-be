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
      const existingUser = await this.UserRepository.findOne({
        where: {
          phoneNo: createAuthenticationDto.phoneNo,
        }
      })
      if(existingUser != null) {
        throw new HttpException("user already exist", HttpStatus.BAD_REQUEST)
      }else{
       const createdUser = await this.UserRepository.save(createAuthenticationDto);
       console.log(createdUser)
       return {
         user: createdUser,
         access_token: await this.jwtService.signAsync({user: createdUser}, {
          expiresIn: process.env.JWT_EXPIRES_IN
         }),
       };
      }
  }

  async loginUser(loginUserDto: LoginUserDto) {
      if ((!loginUserDto.phoneNo) || !loginUserDto.password) {
        return  'email and password required'
      }
      const existingUser = await this.UserRepository.findOne({
        where: {
          phoneNo: loginUserDto.phoneNo,
        },
      })
      if(existingUser == null ) {
        throw new HttpException("PhoneNo dosen't have an account try creating an account instead", HttpStatus.BAD_REQUEST)
      }else if(!await bcrypt.compare(loginUserDto.password, existingUser.password)){
        throw new HttpException("Incorrect Password", HttpStatus.BAD_REQUEST)
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
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
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
  }

  async remove(id: number) {
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
  }
}
