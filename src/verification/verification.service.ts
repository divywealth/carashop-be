import { Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { BadRequest } from '../Utill/responseService';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}
  async create(user: User, verificationCode: string) {
    return await this.verificationRepository.save({
      user: user,
      verificationCode: verificationCode,
    });
  }
  findAll() {
    return `This action returns all verification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verification`;
  }

  update(id: number, updateVerificationDto: UpdateVerificationDto) {
    return `This action updates a #${id} verification`;
  }

  removeUsersVerification(user: User) {
    try {
      const existingUserVerification = this.verificationRepository.find({
        where: {
          user: {
            id: user.id,
          },
        },
      });
      if (!existingUserVerification) {
        return BadRequest("user Dosen't have a verificationCode");
      }
      return this.verificationRepository.delete({ user });
    } catch (error) {
      throw error;
    }
  }
  remove(id: number) {
    return `This action removes a #${id} verification`;
  }
}
