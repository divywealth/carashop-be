import { IsNotEmpty } from 'class-validator';
import { Size } from '../enum/size';

export class CreateUserproductDto {
  productId: number;

  @IsNotEmpty()
  size: Size;

  @IsNotEmpty()
  quantity: number;
}
