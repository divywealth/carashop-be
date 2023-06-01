import { Injectable } from '@nestjs/common';
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
    private readonly suborde: Repository<Suborde>,
  ) {}
  create(
    createSubordeDto: CreateSubordeDto,
    order: Order,
    product: Product,
    quantity: number,
    price: number,
  ) {
    try {
      return this.suborde.save({
        order: order,
        product: product,
        quantity: quantity,
        amount: price * quantity,
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

  update(id: number, updateSubordeDto: UpdateSubordeDto) {
    return `This action updates a #${id} suborde`;
  }

  remove(id: number) {
    return `This action removes a #${id} suborde`;
  }
}
