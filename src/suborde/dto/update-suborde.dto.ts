import { PartialType } from '@nestjs/swagger';
import { CreateSubordeDto } from './create-suborde.dto';

export class UpdateSubordeDto extends PartialType(CreateSubordeDto) {}
