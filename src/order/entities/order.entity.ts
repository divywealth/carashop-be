import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../Enums/status';
import { Suborde } from 'src/suborde/entities/suborde.entity';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.order, { onDelete: 'CASCADE', })
  user: User;

  @Column({
    type: 'enum',
    enum: Status,
    default: 'New',
  })
  status: Status;

  @OneToMany(() => Suborde, (suborde) => suborde.order)
  suborder: Suborde[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
