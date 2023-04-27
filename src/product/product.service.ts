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
    /**const bucket = this.S3_bucket;
    const body = createProductDto.img.buffer;
    const contentType = createProductDto.img.mimetype;
    const split = createProductDto.img.originalname.split('.');
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
    };**/

    try {
      //let s3Response = await this.s3.upload(params).promise();
       //console.log(s3Response);
    }catch(e) {
      throw(e.message)
    }
  }

  findAll() {
    try{
      return this.ProductRepository.find()
    }catch(e) {
      throw(e.message)
    }
  }

  findOne(id: number) {
    
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    try {
      const existingProduct = await this.ProductRepository.findOne({
        where: {
          id:id
        }
      })
      if(existingProduct != null) {
        return this.ProductRepository.delete({id})
      }else {
        throw new HttpException("User wasn't found", HttpStatus.BAD_REQUEST)
      }
    }catch(e) {
      throw(e.message)
    }
  }
}
