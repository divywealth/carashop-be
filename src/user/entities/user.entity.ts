import { Order } from 'src/order/entities/order.entity';
import { Userproduct } from 'src/userproduct/entities/userproduct.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Verification } from '../../verification/entities/verification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  phoneNo: string;

  @Column({
    nullable: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Userproduct, (userproduct) => userproduct.user)
  public userProduct: Userproduct[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => Verification, (verification) => verification.user)
  verification: Verification[];
}
