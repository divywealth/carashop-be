import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {Express} from "express"

export class UpdateProductDto extends PartialType(CreateProductDto) {}
