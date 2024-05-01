import { DetalleNota } from "src/detallenota/detallenota.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'unidad'})
export class Unidad{
    @PrimaryColumn()
    idUnidad: string

    @Column()
    descripcionU: string

    @OneToMany(()=>DetalleNota, (detallenota)=>detallenota.unidad)
    detallenota: DetalleNota[];
}