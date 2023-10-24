import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { ImageModule } from './image/image.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserproductModule } from './userproduct/userproduct.module';
import { Userproduct } from './userproduct/entities/userproduct.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { SubordeModule } from './suborde/suborde.module';
import { Suborde } from './suborde/entities/suborde.entity';
import { AddressModule } from './address/address.module';
import { Address } from './address/entities/address.entity';
import { VerificationModule } from './verification/verification.module';
import { Verification } from './verification/entities/verification.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    //Enviroment variable configuration
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['./env/.env.production','./env/.production.env' ]
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    //Connection to database details
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [
        User,
        Product,
        Userproduct,
        Order,
        Suborde,
        Address,
        Verification,
      ],
      synchronize: JSON.parse(process.env.SYNCHRONIZE),
    }),
    UserModule,
    ProductModule,
    ImageModule,
    AuthenticationModule,
    UserproductModule,
    OrderModule,
    SubordeModule,
    AddressModule,
    VerificationModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
