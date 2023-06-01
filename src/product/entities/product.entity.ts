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
import { Size } from '../../userproduct/enum/size';
import { Suborde } from 'src/suborde/entities/suborde.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  designer: string;

  @Column({
    nullable: false,
  })
  img: string;

  @Column({
    nullable: false,
  })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Userproduct, (userproduct) => userproduct.product)
  public userProduct: Userproduct[];

  @OneToMany(() => Suborde, (suborde) => suborde.product)
  suborder: Suborde
}
