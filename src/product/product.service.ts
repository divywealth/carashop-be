import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ConfigService } from '@nestjs/config';
import * as AWS from "aws-sdk";
import { format } from 'date-fns';

@Injectable()
export class ProductService {
  private readonly S3_bucket;
  private s3;
  constructor(
    @InjectRepository(Product) private readonly ProductRepository: Repository<Product>,
    private readonly configService: ConfigService
  ){
    this.S3_bucket = configService.get<string>("AWS_S3_BUCKET")
    this.s3 = new AWS.S3({
      accessKeyId: configService.get<string>("AWS_S3_ACCESS_KEY"),
      secretAccessKey: configService.get<string>("AWS_S3_SECRET_KEY"),
    })
  }

  async create(createProductDto: CreateProductDto){
        const bucket = this.S3_bucket;
        const body = createProductDto.file.buffer;
        const contentType = createProductDto.file.mimetype;
        const split = createProductDto.file.originalname.split('.');
        const extention = split.pop();
        const s3Key = format(new Date, "yyy-MM-dd-hh-mm-ss");
        const fileName = `file${s3Key}.${extention}`
        const params = {
          Bucket: bucket!,
          Key: fileName,
          Body: body,
          ACL: "public-read",
          ContentType: contentType,
          ContentDisposition:"inline"
        };
        let s3Response = await this.s3.upload(params).promise();
        const save = {
          name: createProductDto.name,
          designer: createProductDto.designer,
          img: s3Response.Location,
          price: createProductDto.price,
          quantity: createProductDto.quantity,
          size: createProductDto.size
        };
        return this.ProductRepository.save(save)
  }

  findAll() {
    return this.ProductRepository.find()
  }

  async findOne(id: number) {
      const existingProduct = await this.ProductRepository.findOne({
        where: {
          id:id
        }
      })
      if(existingProduct != null) {
        return existingProduct
      }else {
        throw new HttpException("Product wasn't found", HttpStatus.BAD_REQUEST)
      }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
      const existingProduct = await this.ProductRepository.findOne({
        where: {
          id:id
        }
      })
      if(existingProduct != null) {
        const bucket = this.S3_bucket;
        const body = updateProductDto.file.buffer;
        const contentType = updateProductDto.file.mimetype;
        const split = updateProductDto.file.originalname.split('.');
        const extention = split.pop();
        const s3Key = format(new Date, "yyy-MM-dd-hh-mm-ss");
        const fileName = `file${s3Key}.${extention}`
        const params = {
          Bucket: bucket!,
          Key: fileName,
          Body: body,
          ACL: "public-read",
          ContentType: contentType,
          ContentDisposition:"inline"
        };
        let s3Response = await this.s3.upload(params).promise();
        const save = {
          name: updateProductDto.name,
          designer: updateProductDto.designer,
          img: s3Response.Location,
          price: updateProductDto.price,
          quantity: updateProductDto.quantity,
          size: updateProductDto.size
        };
        console.log(save)
        return this.ProductRepository.update({id}, {...save})
      }else {
        throw new HttpException("Product was not found", HttpStatus.BAD_REQUEST)
      }
  }

  async remove(id: number) {
    const existingProduct = await this.ProductRepository.findOne({
      where: {
        id:id
      }
    })
    if(existingProduct != null) {
      return this.ProductRepository.delete({id})
    }else {
      throw new HttpException("Product wasn't found", HttpStatus.BAD_REQUEST)
    }
  }
}
