import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubordeDto } from './dto/create-suborde.dto';
import { UpdateSubordeDto } from './dto/update-suborde.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Suborde } from './entities/suborde.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class SubordeService {
  constructor(
    @InjectRepository(Suborde)
    private readonly subordeRepository: Repository<Suborde>,
  ) {}
  create(
    order: Order,
    product: Product,
    quantity: number,
    price: number,
    size: string,
  ) {
    try {
      return this.subordeRepository.save({
        order: order,
        product: product,
        quantity: quantity,
        amount: price * quantity,
        size: size,
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all suborde`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suborde`;
  }

  async findAllOrderProducts(orderId: number) {
    try {
      console.log(orderId);
      const existingOrderProducts = await this.subordeRepository.find({
        where: {
          order: {
            id: orderId,
          },
        },
        relations: ['product', 'order'],
      });
      if (existingOrderProducts) {
        return existingOrderProducts;
      } else {
        throw new HttpException(
          "orderId dosen't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateSubordeDto: UpdateSubordeDto) {
    return `This action updates a #${id} suborde`;
  }

  remove(id: number) {
    return `This action removes a #${id} suborde`;
  }
}
