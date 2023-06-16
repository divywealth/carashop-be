import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgetPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { IsEmail } from 'class-validator';
import { VerificationService } from '../verification/verification.service';

@Controller({
  version: '1',
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly verificationService: VerificationService,
  ) {}

  @Post('user')
  @UsePipes(ValidationPipe)
  async create(@Body() body) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
      const createAuthenticationDto: CreateAuthenticationDto = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNo: body.phoneNo,
        password: hashedPassword,
      };
      return this.authenticationService.create(createAuthenticationDto);
    } catch (e) {
      throw e.message;
    }
  }

  @Post('user/login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.authenticationService.loginUser(loginUserDto);
    } catch (e) {
      throw e.message;
    }
  }

  @Patch('user/:id')
  update(
    @Param('id') id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  ) {
    try {
      return this.authenticationService.update(+id, updateAuthenticationDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    try {
      return this.authenticationService.remove(+id);
    } catch (error) {
      throw error.message;
    }
  }

  @Post('user/forgetpassword')
  sendResetPasswordCode(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return this.authenticationService.sendResetPasswordCode(
        resetPasswordDto.email,
      );
    } catch (e) {
      throw e.message;
    }
  }

  @Post('user/verifycode')
  @UsePipes(ValidationPipe)
  verifyPasswordCode(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return this.authenticationService.verifyPasswordCode(resetPasswordDto);
    } catch (e) {
      throw e.message;
    }
  }

  @Post('user/resetpassword')
  resetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authenticationService.resetPassword(forgetPasswordDto);
  }
}
