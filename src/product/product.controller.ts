import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '../image/dto/file-upload-dto';
import { Express } from 'express';

@Controller({
  path: 'product',
  version: '1',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'some description',
    type: FileUploadDto,
  })
  @Post()
  @UsePipes(ValidationPipe)
  async create(@UploadedFile() file: Express.Multer.File, @Body() body) {
    try {
      const createProductDto: CreateProductDto = {
        name: body.name,
        designer: body.designer,
        file: file,
        img: body.img,
        price: body.price,
      };
      return this.productService.create(createProductDto);
    } catch (e) {
      throw e.message;
    }
  }

  @Get()
  findAll() {
    try {
      return this.productService.findAll();
    } catch (e) {
      throw e.message;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.productService.findOne(+id);
    } catch (e) {
      throw e.message;
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() body,
  ) {
    try {
      const updateProductDto: UpdateProductDto = {
        name: body.name,
        designer: body.designer,
        file: file,
        img: body.img,
        price: body.price,
      };
      console.log(updateProductDto);
      return this.productService.update(+id, updateProductDto);
    } catch (e) {
      throw e.message;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.productService.remove(+id);
    } catch (e) {
      throw e.message;
    }
  }
}
