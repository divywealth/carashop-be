import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    try {
      return this.addressRepository.save(createAddressDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all address`;
  }

  async findOne(id: number) {
    try {
      const existingAddress = await this.addressRepository.findOne({
        where: {
          id: id,
        },
      });
      if (existingAddress) {
        return existingAddress;
      } else {
        throw new HttpException('address not created', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
