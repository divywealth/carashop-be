import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller({
  path: 'userproduct',
  version: '1'
})
export class UserproductController {
  constructor(
    private readonly userproductService: UserproductService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private jwtService: JwtService
    ) {}

  @Post()
  async create(@Body() createUserproductDto: CreateUserproductDto, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET})
      const userId = decodedToken.user.id
      const user = await this.userService.findOne(userId);
      const product = await this.productService.findOne(createUserproductDto.productId);
      return this.userproductService.create(createUserproductDto, user, product);
    } catch (error) {
      throw error
    }
  }

  @Get()
  findAll() {
    try {
      return this.userproductService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userproductService.findOne(+id);
    } catch (error) {
      throw error
    }
  }

  @Get('users/:userId/products')
  async findUserProduct(@Param('userId') userId: string, @Req() request: Request) {
    try {
    const token = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET})
    const newdecodeToken = decodedToken.user.id
    const convertedUserId = newdecodeToken.toString();
    userId = convertedUserId
    const intUserId = parseInt(userId)
    const user = await this.userService.findOne(intUserId);
    this.userproductService.findUserProducts(user)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserproductDto: UpdateUserproductDto) {
    return this.userproductService.update(+id, updateUserproductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.userproductService.findOne(+id);
    }catch(error) {
      throw error
    }
  }
}
