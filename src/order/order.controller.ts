import { JwtService } from '@nestjs/jwt';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Controller({
  version: '1'
})
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Post('order')
  async create(
    @Body() createOrderDto: CreateOrderDto, 
    @Req() request: Request,
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user.id;
      const user = await this.userService.findOne(userId);
      return this.orderService.create(createOrderDto, user);
    } catch (error) {
      throw error.message;
    }
  }

  @Get('orders')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('order/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch('order/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('order/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
