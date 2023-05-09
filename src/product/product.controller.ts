import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UsePipes, ValidationPipe  } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '../image/dto/file-upload-dto';
import { Express } from 'express';

@Controller({
  path: 'product',
  version: '1'
})
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    ) {}
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'some description',
    type: FileUploadDto
  })

  @Post()
  @UsePipes(ValidationPipe)
  async create(@UploadedFile() file: Express.Multer.File, @Body() body){
    const createProductDto: CreateProductDto = {
      name: body.name,
      designer: body.designer,
      file: file,
      img: body.img,
      price: body.price,
      quantity: body.quantity,
      size: body.size
    }
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
  @UseInterceptors(FileInterceptor('file'))
 async update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string ,@Body() body) {
   const updateProductDto: UpdateProductDto = {
    name: body.name,
    designer: body.designer,
    file: file,
    img: body.img,
    price: body.price,
    size: body.size,
    quantity: body.quantity,
   }
   
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
