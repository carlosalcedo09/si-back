import { Estudiante } from "src/estudiante/estudiante.entity";
import { Facultad } from "src/facultad/facultad.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'carrera'})

export class Carrera{
    @PrimaryColumn()
    idCarrera: number

    @Column()
    nombreCarrera: string

    @Column()
    idFacultad: number
    
    @ManyToOne(()=> Facultad, (facultad)=>facultad.carrera)
    @JoinColumn({name: 'idFacultad'})
    facultad: Facultad;

    @OneToMany(()=>Estudiante,(estudiante)=>estudiante.carrera)
    estudiante: Estudiante[];
}