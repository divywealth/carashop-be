import { Module } from '@nestjs/common';
import { SubordeService } from './suborde.service';
import { SubordeController } from './suborde.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suborde } from './entities/suborde.entity';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Suborde, Product, Order])],
  controllers: [SubordeController],
  providers: [SubordeService, ProductService, OrderService, CloudinaryService]
})
export class SubordeModule {}
