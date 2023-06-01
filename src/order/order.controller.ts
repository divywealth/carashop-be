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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { SubordeService } from 'src/suborde/suborde.service';
import { UserproductService } from '../userproduct/userproduct.service';
import { Userproduct } from '../userproduct/entities/userproduct.entity';

@Controller({
  version: '1',
})
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly suborderService: SubordeService,
    private readonly userProductService: UserproductService,
  ) {}

  @Post('order')
  async create(@Body() body, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user.id;
      const user = await this.userService.findOne(userId);
      const createOrderDto: CreateOrderDto = {
        userId: body.userId,
        status: body.status,
        suborder: {
          orderId: body.suborder.orderId,
          productId: body.suborder.productId,
          quantity: body.suborder.quantity,
          amount: body.suborder.amount,
        },
      };
      const existingUserProducts: Userproduct[] = await this.userProductService.findUserProducts(user);
      if (existingUserProducts == null) {
        throw new HttpException(
          "user doesn't have any product",
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const deleteUserProduct = await this.userProductService.removeAll(user);
        const savedOrder = await this.orderService.create(createOrderDto, user);
        const order = await this.orderService.findOne(savedOrder.id);
        for (let i = 0; i < existingUserProducts.length; i++) {
          const product = await this.productService.findOne(
            existingUserProducts[i].product.id,
          );
          const savedSubOrder = this.suborderService.create(
            createOrderDto.suborder,
            order,
            product,
            existingUserProducts[i].quantity,
            product.price,
          );
        }
        return savedOrder;
      }
    } catch (error) {
      throw error.message;
    }
  }

  @Get('orders')
  findAll() {
    try {
      return this.orderService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  @Get('order/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.orderService.findOne(+id);
    } catch (error) {
      throw error.message;
    }
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
