import { Column, Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from "typeorm";

import { Product } from './product.entity';

export  enum State 
{
    Activo ='Activo',
    Inactivo = 'Inactivo'
}

@Entity()
export class Trademark
{
    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
    })
    @PrimaryColumn()
    id : number;


    @Column({
        nullable: false,
        type: "varchar",
        name: 'name',
        length: 150
    })
    name : string;


    @Column({
        nullable: false,
        type: "text",
        name: 'img'
    })
    img : string;


    @Column({
        nullable: false,
        type : "enum",
        enum: State
    })
    state: string;

    @OneToMany(type => Product, product => product.trademark)
    products: Product[];
    
} 
