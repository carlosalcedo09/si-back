import { DetalleMatricula } from "src/detallematricula/detallematricula.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({})

export class Turno{
    @PrimaryColumn()
    idTurno:string

    @Column()
    descripcionTurno: string

    @OneToMany(()=>DetalleMatricula,(detallematricula)=>detallematricula.turno)
    detallematricula:DetalleMatricula[];
}