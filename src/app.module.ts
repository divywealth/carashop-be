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


@Module({
  imports: [
    //Enviroment variable configuration
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['./env/.env.production','./env/.production.env' ]
      envFilePath: `./env/.env.${process.env.NODE_ENV}`
    }),
    //Connection to database details
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Product, Userproduct],
      synchronize: process.env.SYNCHRONIZE,
    }),
    UserModule, 
    ProductModule, 
    ImageModule, 
    AuthenticationModule, UserproductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
