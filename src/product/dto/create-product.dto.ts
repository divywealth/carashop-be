import { IsNotEmpty } from "class-validator";
import { Size } from "../enum/size";
import {Express} from "express"

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    designer: string;

    
    img: string

    @IsNotEmpty()
    price: string;

    size: Size;

    quantity: number;
}
