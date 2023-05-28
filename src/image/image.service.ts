import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { format } from 'date-fns';

@Injectable()
export class ImageService {
  private readonly S3_bucket;
  private s3;
  constructor(private readonly configService: ConfigService) {
    this.S3_bucket = configService.get<string>('AWS_S3_BUCKET');
    this.s3 = new AWS.S3({
      accessKeyId: configService.get<string>('AWS_S3_ACCESS_KEY'),
      secretAccessKey: configService.get<string>('AWS_S3_SECRET_KEY'),
    });
  }

  async create(createImageDto: CreateImageDto) {
    const bucket = this.S3_bucket;
    const body = createImageDto.file.buffer;
    const contentType = createImageDto.file.mimetype;
    const split = createImageDto.file.originalname.split('.');
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

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
      console.log(s3Response);
    } catch (e) {
      throw e.message;
    }
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
