import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '../image/dto/file-upload-dto';
import { Express } from 'express';
import { ImageService } from '../image/image.service';
import { CreateImageDto } from '../image/dto/create-image.dto';

@Controller({
  path: 'product',
  version: '1'
})
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imageService: ImageService
    ) {}
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'some description',
    type: FileUploadDto
  })

  @Post()
  create( @Body() createProductDto: CreateProductDto, createImageDto: CreateImageDto){
    
    const image = this.imageService.create(createImageDto)
    console.log(createImageDto)
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
