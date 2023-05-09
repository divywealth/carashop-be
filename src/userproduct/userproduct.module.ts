import { Module } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { UserproductController } from './userproduct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Userproduct } from './entities/userproduct.entity';
import { Product } from 'src/product/entities/product.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Userproduct, User, Product ])],
  controllers: [UserproductController],
  providers: [UserproductService, UserService, ProductService]
})
export class UserproductModule {}
