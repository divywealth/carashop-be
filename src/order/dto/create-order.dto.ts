import { Status } from '../Enums/status';

export class CreateOrderDto {
  userId: number;
  status: Status;
}
