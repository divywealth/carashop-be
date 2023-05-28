import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubordeService } from './suborde.service';
import { CreateSubordeDto } from './dto/create-suborde.dto';
import { UpdateSubordeDto } from './dto/update-suborde.dto';

@Controller('suborde')
export class SubordeController {
  constructor(private readonly subordeService: SubordeService) {}

  @Post()
  create(@Body() createSubordeDto: CreateSubordeDto) {
    return this.subordeService.create(createSubordeDto);
  }

  @Get()
  findAll() {
    return this.subordeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subordeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubordeDto: UpdateSubordeDto) {
    return this.subordeService.update(+id, updateSubordeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subordeService.remove(+id);
  }
}
