import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Suborde } from 'src/suborde/entities/suborde.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
import { SubordeService } from 'src/suborde/suborde.service';
import { Userproduct } from '../userproduct/entities/userproduct.entity';
import { UserproductService } from '../userproduct/userproduct.service';
import { ValidateHeader } from '../userproduct/middlewares/validate-user-header.middleware';
import { Address } from '../address/entities/address.entity';
import { AddressService } from '../address/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      User,
      Suborde,
      Product,
      Userproduct,
      Address,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    UserService,
    ProductService,
    SubordeService,
    UserproductService,
    AddressService,
  ],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateHeader).forRoutes({
      path: 'v1/order',
      method: RequestMethod.POST,
    });
  }
}
