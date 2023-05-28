import { Injectable } from '@nestjs/common';
import { CreateSubordeDto } from './dto/create-suborde.dto';
import { UpdateSubordeDto } from './dto/update-suborde.dto';

@Injectable()
export class SubordeService {
  create(createSubordeDto: CreateSubordeDto) {
    return 'This action adds a new suborde';
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
