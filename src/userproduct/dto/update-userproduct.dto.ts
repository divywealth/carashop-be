import { PartialType } from '@nestjs/swagger';
import { CreateUserproductDto } from './create-userproduct.dto';

export class UpdateUserproductDto extends PartialType(CreateUserproductDto) {}
