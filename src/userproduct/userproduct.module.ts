import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { UserproductController } from './userproduct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Userproduct } from './entities/userproduct.entity';
import { Product } from 'src/product/entities/product.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { JwtModule } from '@nestjs/jwt';
import { ValidateHeader } from './middlewares/validate-user-header.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userproduct, User, Product]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [UserproductController],
  providers: [UserproductService, UserService, ProductService],
})
export class UserproductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateHeader).forRoutes(
      {
        path: 'v1/userproduct',
        method: RequestMethod.POST,
      },
      {
        path: 'v1/users/:userId/products',
        method: RequestMethod.GET,
      },
      {
        path: 'v1/userproducts',
        method: RequestMethod.DELETE,
      },
    );
  }
}
