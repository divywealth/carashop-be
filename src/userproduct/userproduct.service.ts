import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { Userproduct } from './entities/userproduct.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserproductService {
  constructor(
    @InjectRepository(Userproduct) private readonly userproductRepository: Repository<Userproduct>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private jwtService: JwtService
  ) {}

  async create(createUserproductDto: CreateUserproductDto, user: User, product: Product) {
    try {
      const existingUserProduct = await this.userproductRepository.findOne({
        where: {
          user: user,
          product: product
        }
      })
      console.log(this.userproductRepository, user, product)
      if(existingUserProduct != null) {
        throw new HttpException("User chosen product already", HttpStatus.BAD_REQUEST)
      }else {
        const saveUserProduct = await this.userproductRepository.save({
          user: user,
          product: product
        })
        return saveUserProduct
      }
    }catch(e) {
      throw(e.message)
    }
  }

  findAll() {
    try {
      return this.userproductRepository.find({relations: ['user', 'product']})
    }catch (e) {
      throw(e.message)
    }
  }

  findOne(id: number) {
    try{
      const existingUserProduct = this.userproductRepository.findOne({where: {id:id}, relations: ['user', 'product']})
      if(existingUserProduct) {
        return existingUserProduct
      }else {
        throw new HttpException('UserProduct not found', HttpStatus.BAD_REQUEST)
      }
    }catch (e) {
      throw(e.message)
    }
  }

  async findUserProducts(user: User ) {
    try {
      const existingUser = await this.userproductRepository.find({
        where: {
          user: user
        }
        })
        console.log(existingUser)
    }catch (error) {
      console.log(error)
      throw error
    }
  }

  update(id: number, updateUserproductDto: UpdateUserproductDto) {
    return `This action updates a #${id} userproduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} userproduct`;
  }
}
