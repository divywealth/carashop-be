import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { Userproduct } from './entities/userproduct.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserproductService {
  constructor(
    @InjectRepository(Userproduct)
    private readonly userproductRepository: Repository<Userproduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private jwtService: JwtService,
  ) {}

  async create(
    createUserproductDto: CreateUserproductDto,
    user: User,
    product: Product,
  ) {
    try {
      const existingUserProduct = await this.userproductRepository.findOne({
        where: {
          user: {
            id: user.id,
          },
          product: {
            id: product.id,
          },
        },
      });
      if (existingUserProduct != null) {
        throw new HttpException(
          'User chosen product already',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const saveUserProduct = await this.userproductRepository.save({
          user: user,
          product: product,
          size: createUserproductDto.size,
          quantity: createUserproductDto.quantity,
        });
        return saveUserProduct;
      }
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    try {
      return this.userproductRepository.find({
        relations: ['user', 'product'],
      });
    } catch (e) {
      throw e.message;
    }
  }

  findOne(id: number) {
    try {
      const existingUserProduct = this.userproductRepository.findOne({
        where: { id: id },
        relations: ['user', 'product'],
      });
      if (existingUserProduct) {
        return existingUserProduct;
      } else {
        throw new HttpException(
          'UserProduct not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw e.message;
    }
  }

  async findUserProducts(user: User): Promise<Userproduct[]> {
    try {
      const existingUserProduct = await this.userproductRepository.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          product: true,
          user: false,
        },
        select: ['product'],
      });
      console.log(existingUserProduct);
      if (existingUserProduct) {
        return existingUserProduct;
      } else {
        throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserproductDto: UpdateUserproductDto) {
    return `This action updates a #${id} userproduct`;
  }

  async removeAll(user: User): Promise<DeleteResult> {
    try {
      const userproduct: Userproduct[] = await this.userproductRepository.find({
        where: {
          user: {
            id: user.id,
          },
        },
      });
      if (userproduct) {
        return this.userproductRepository.delete({ user });
      }
    } catch (error) {
      throw error;
    }
  }

  async removeOne(id: number): Promise<DeleteResult> {
    try {
      const userproduct = await this.userproductRepository.findOne({
        where: {
          id: id,
        },
      });
      if (userproduct) {
        return this.userproductRepository.delete({ id });
      } else {
        throw new HttpException(
          'user product not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
