import { Carrera } from "src/carrera/carrera.entity";
import { Entity, PrimaryColumn,Column, OneToMany } from "typeorm";

@Entity({name:'facultad'})
export class Facultad{
    @PrimaryColumn()
    idFacultad: number

    @Column()
    descripcionFa: string

    @OneToMany(()=> Carrera,(carrera)=>carrera.facultad)
    carrera: Carrera[];
}
