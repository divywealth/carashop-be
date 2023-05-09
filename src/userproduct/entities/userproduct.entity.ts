import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Userproduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userProduct)
    public user: User[]

    @ManyToOne(() => Product, (product) => product.userProduct)
    public product: Product[]
}
