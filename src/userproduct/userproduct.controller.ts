import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Controller({
  path: 'userproduct',
  version: '1'
})
export class UserproductController {
  constructor(
    private readonly userproductService: UserproductService,
    private readonly userService: UserService,
    private readonly productService: ProductService
    ) {}

  @Post()
  async create(@Body() createUserproductDto: CreateUserproductDto ) {
    const user = await this.userService.findOne(createUserproductDto.userId)
    const product = await this.productService.findOne(createUserproductDto.productId)
    return this.userproductService.create(createUserproductDto, user, product);
  }

  @Get()
  findAll() {
    return this.userproductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userproductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserproductDto: UpdateUserproductDto) {
    return this.userproductService.update(+id, updateUserproductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userproductService.remove(+id);
  }
}
