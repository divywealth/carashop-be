import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Suborde } from 'src/suborde/entities/suborde.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Suborde)
    private readonly subordeRepository: Repository<Suborde>,
  ) {}
  create(createOrderDto: CreateOrderDto, user: User) {
    try {
      return this.orderRepository.save({
        user: user,
        status: createOrderDto.status,
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.orderRepository.find();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      const existingOrder = this.orderRepository.findOne({
        where: {
          id: id,
        },
      });
      if (existingOrder) {
        return existingOrder;
      } else {
        throw new HttpException('order not found', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
