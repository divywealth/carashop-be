import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, NotFoundException, HttpStatus,} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Controller({
  path: 'user',
  version: '1'
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    ) 
  {}


  @Post()
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
        password: hashedPassword
      }
      return this.authenticationService.create(createAuthenticationDto);
    }catch(e) {
      throw(e.message)
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.authenticationService.loginUser(loginUserDto)
    }catch(e) {
      throw(e.message)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    try{
      return this.authenticationService.update(+id, updateAuthenticationDto);
    }catch(e) {
      throw(e.message)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try{
      return this.authenticationService.remove(+id);
    }catch(error) {
      throw(error.message)
    }
  }
}
