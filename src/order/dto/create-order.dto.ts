import { Status } from '../Enums/status';

export class CreateOrderDto {
  userId: number;
  status: Status;
  suborder: {
    orderId: number;
    productId: number;
    quantity: number;
    amount: number;
  };
}
