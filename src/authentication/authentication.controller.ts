import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller({
  path: 'user',
  version: '1'
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService
    ) 
  {}

  @Post()
  async create(@Body() body) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(body.password, saltOrRounds);
    const createAuthenticationDto: CreateAuthenticationDto = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNo: body.phoneNo,
      street: body.street,
      city: body.city,
      country: body.country, 
      password: hash
    }
    return this.authenticationService.create(createAuthenticationDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {

    
    return this.authenticationService.loginUser(loginUserDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
