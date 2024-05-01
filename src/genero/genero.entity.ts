import { Estudiante } from "src/estudiante/estudiante.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'genero'})
export class Genero {
    @PrimaryColumn()
    idGenero: string

    @Column()
    descripcion:string

    @OneToMany(()=> Profesor,(profesor)=>profesor.genero)
    profesor: Profesor[];

    @OneToMany(()=>Estudiante,(estudiante)=>estudiante.genero)
    estudiante: Estudiante[];
}