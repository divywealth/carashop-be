import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Size } from "../enum/size";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    designer: string;

    @Column({
        nullable: false
    })
    img: string;

    @Column({
        nullable: false
    })
    price: string;

    @Column({
        type: "enum",
        enum: Size,
        nullable: true
    })
    size: Size;

    @Column({
        nullable: true
    })
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
