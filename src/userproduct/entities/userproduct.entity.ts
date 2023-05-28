import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Size } from '../enum/size';

@Entity()
export class Userproduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userProduct)
  public user: User;

  @ManyToOne(() => Product, (product) => product.userProduct)
  public product: Product;

  @Column({
    type: 'enum',
    enum: Size,
    nullable: false,
  })
  size: Size;

  @Column({
    nullable: false,
  })
  quantity: number;
}
