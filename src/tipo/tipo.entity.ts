import { DetalleNota } from "src/detallenota/detallenota.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'tipo'})

export class Tipo{
    @PrimaryColumn()
    idTipo: string

    @Column()
    descripcion:string

    @OneToMany(()=>DetalleNota, (detallenota)=>detallenota.tipo)
    detallenota: DetalleNota[];
}