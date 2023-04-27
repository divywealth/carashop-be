import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    firstName: string;

    @Column({
        nullable: false
    })
    lastName: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    phoneNo: string;

    @Column({
        nullable: false
    })
    street: string;

    @Column({
        nullable: false
    })
    city: string;

    @Column({
        nullable: false
    })
    country: string;

    @Column({
        nullable: false
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
