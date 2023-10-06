import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { format } from 'date-fns';
import { BadRequest } from '../Utill/responseService';

@Injectable()
export class ProductService {
  private readonly S3_bucket;
  private s3;
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
    private readonly configService: ConfigService,
  ) {
    this.S3_bucket = configService.get<string>('AWS_S3_BUCKET');
    this.s3 = new AWS.S3({
      accessKeyId: configService.get<string>('AWS_S3_ACCESS_KEY'),
      secretAccessKey: configService.get<string>('AWS_S3_SECRET_KEY'),
    });
  }

  async create(createProductDto: CreateProductDto) {
    const bucket = this.S3_bucket;
    const body = createProductDto.file.buffer;
    const contentType = createProductDto.file.mimetype;
    const split = createProductDto.file.originalname.split('.');
    const extention = split.pop();
    const s3Key = format(new Date(), 'yyy-MM-dd-hh-mm-ss');
    const fileName = `file${s3Key}.${extention}`;
    const params = {
      Bucket: bucket!,
      Key: fileName,
      Body: body,
      ACL: 'public-read',
      ContentType: contentType,
      ContentDisposition: 'inline',
    };
    const s3Response = await this.s3.upload(params).promise();
    const save = {
      name: createProductDto.name,
      designer: createProductDto.designer,
      img: s3Response.Location,
      price: createProductDto.price,
    };
    return this.ProductRepository.save(save);
  }

  findAll() {
    try {
      return this.ProductRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const existingProduct = await this.ProductRepository.findOne({
        where: {
          id: id,
        },
      });
      if (existingProduct != null) {
        return existingProduct;
      } else {
        throw BadRequest("Product wasn't found");
      }
    } catch (e) {
      throw e;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.ProductRepository.findOne({
      where: {
        id: id,
      },
    });
    if (existingProduct != null) {
      if (updateProductDto.file) {
        const bucket = this.S3_bucket;
        const body = updateProductDto.file.buffer;
        const contentType = updateProductDto.file.mimetype;
        const split = updateProductDto.file.originalname.split('.');
        const extention = split.pop();
        const s3Key = format(new Date(), 'yyy-MM-dd-hh-mm-ss');
        const fileName = `file${s3Key}.${extention}`;
        const params = {
          Bucket: bucket!,
          Key: fileName,
          Body: body,
          ACL: 'public-read',
          ContentType: contentType,
          ContentDisposition: 'inline',
        };
        const s3Response = await this.s3.upload(params).promise();
        const updateFile = {
          img: s3Response.Location,
        }
        return this.ProductRepository.update({ id }, {...updateFile})
      }
      return this.ProductRepository.update({ id }, { ...updateProductDto });
    } else {
      throw BadRequest('Product was not found');
    }
  }

  async remove(id: number) {
    const existingProduct = await this.ProductRepository.findOne({
      where: {
        id: id,
      },
    });
    if (existingProduct != null) {
      return this.ProductRepository.delete({ id });
    } else {
      throw BadRequest("Product wasn't found");
    }
  }
}
