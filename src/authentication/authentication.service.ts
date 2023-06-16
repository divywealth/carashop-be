import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomNumber } from '../Utill/randomUtil';
import { Verification } from '../verification/entities/verification.entity';
import { EmailNotificationService } from '../Utill/sendGridService';
import { ForgetPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { BadRequest } from '../Utill/responseService';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private jwtService: JwtService,
    private readonly emailNotificationService: EmailNotificationService,
    private readonly verificationService: VerificationService,
  ) {}

  async create(createAuthenticationDto: CreateAuthenticationDto) {
    const existingUser = await this.UserRepository.findOne({
      where: {
        email: createAuthenticationDto.email,
      },
    });
    if (existingUser != null) {
      throw BadRequest('user already exist');
    } else {
      const createdUser = await this.UserRepository.save(
        createAuthenticationDto,
      );
      console.log(createdUser);
      return {
        user: createdUser,
        access_token: await this.jwtService.signAsync({ user: createdUser }),
      };
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    if (!loginUserDto.phoneNo || !loginUserDto.password) {
      throw BadRequest('email and password required');
    }
    const existingUser = await this.UserRepository.findOne({
      where: {
        phoneNo: loginUserDto.phoneNo,
      },
    });
    if (existingUser == null) {
      throw BadRequest(
        "PhoneNo dosen't have an account try creating an account instead",
      );
    } else if (
      !(await bcrypt.compare(loginUserDto.password, existingUser.password))
    ) {
      return BadRequest('Incorrect Password');
    } else {
      return {
        user: existingUser,
        access_token: this.jwtService.sign({ user: existingUser }),
      };
    }
  }

  async sendResetPasswordCode(email: string) {
    try {
      const existingUser = await this.UserRepository.findOne({
        where: {
          email: email,
        },
      });
      const message = `A password reset link has been sent to ${email}`;
      if (!existingUser) {
        return BadRequest('No account with this email');
      }
      const clearUserOldVerificationCode =
        this.verificationService.removeUsersVerification(existingUser);
      const verificationCode = randomNumber(6);
      const verification = this.verificationService.create(
        existingUser,
        verificationCode,
      );
      //send email
      const emailPayload = {
        to: email,
        subject: 'Cara-shop Reset Password',
        from: 'christianonuora1@gmail.com',
        text: 'Hello World from NestJS Sendgrid',
        html: `<h1>Hello ${existingUser.firstName} your verification code is ${verificationCode}</h1>`,
      };
      await this.emailNotificationService.sendNotification(emailPayload);
      return { existingUser, message };
    } catch (e) {
      throw e;
    }
  }

  async verifyPasswordCode(resetPasswordDto: ResetPasswordDto) {
    try {
      const verify = this.verificationRepository.findOne({
        where: {
          user: {
            email: resetPasswordDto.email,
          },
          verificationCode: resetPasswordDto.verificationCode,
        },
      });
      if (!verify) {
        return BadRequest('invalid verification code');
      }
      return 'successful';
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(forgetPasswordDto: ForgetPasswordDto) {
    try {
      if (!forgetPasswordDto.password) {
        return BadRequest('Password is required');
      }
      if (forgetPasswordDto.password.length < 5) {
        return BadRequest(
          'Password is too short. Atleast 6 characters required',
        );
      }
      const existingUser = await this.UserRepository.findOne({
        where: {
          email: forgetPasswordDto.email,
        },
      });
      if (!existingUser) {
        return BadRequest('user not found');
      }
      const saltOrRounds = 10;
      const password = await bcrypt.hash(
        forgetPasswordDto.password,
        saltOrRounds,
      );
      const email = forgetPasswordDto.email;
      return await this.UserRepository.update(
        { email },
        {
          password,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    try {
      const existingUser = await this.UserRepository.findOne({
        where: {
          id: id,
        },
      });
      if (existingUser != null) {
        return this.UserRepository.update(
          { id },
          { ...updateAuthenticationDto },
        );
      } else {
        return BadRequest('User not found');
      }
    } catch (e) {
      throw e;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.UserRepository.findOne({
        where: {
          id: id,
        },
      });
      if (existingUser != null) {
        return this.UserRepository.delete({ id });
      } else {
        return BadRequest("User wasn't found");
      }
    } catch (e) {
      throw e;
    }
  }
}
