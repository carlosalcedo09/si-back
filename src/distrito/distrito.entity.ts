import { Estudiante } from "src/estudiante/estudiante.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Entity, Column,PrimaryColumn, OneToMany } from "typeorm";

@Entity({name:'distrito'})
export class Distrito {
    @PrimaryColumn()
    IDDistrito: number;

    @Column()
    Nombre_Di: string;  

    @OneToMany(()=>Profesor,(profesor)=>profesor.distrito)
    profesor: Profesor[];

    @OneToMany(()=>Estudiante,(estudiante)=>estudiante.distrito)
    estudiante: Estudiante[];

    
}
