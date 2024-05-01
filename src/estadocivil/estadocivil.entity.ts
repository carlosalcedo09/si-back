import { Estudiante } from "src/estudiante/estudiante.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'estadocivil'})
export class EstadoCivil{
    @PrimaryColumn()
    idEstado: string

    @Column()
    descripcionE: string

    @OneToMany(()=> Profesor,(profesor)=> profesor.estadocivil)
    profesor: Profesor[];

    @OneToMany(()=> Estudiante,(estudiante)=> estudiante.estadocivil)
    estudiante: Estudiante[];
}