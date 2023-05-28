import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Get All Users
  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  //Get just a User by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (error) {
      throw error.message;
    }
  }
}
