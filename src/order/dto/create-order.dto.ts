import { Status } from '../Enums/status';
import { Address } from '../../address/entities/address.entity';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

export class CreateOrderDto {
  userId: number;
  status: Status;
  address: CreateAddressDto;
}
