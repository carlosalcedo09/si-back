import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({})

export class Turno{
    @PrimaryColumn()
    idTurno:string

    @Column()
    descripcionTurno: string

}