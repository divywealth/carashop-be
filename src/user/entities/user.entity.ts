import { Exclude } from "class-transformer";
import { Userproduct } from "src/userproduct/entities/userproduct.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Exclude()
    @Column({
        nullable: false
    })
    password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Userproduct, (userproduct) => userproduct.user)
    public userProduct: Userproduct[]

}
